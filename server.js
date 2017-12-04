const sys = require('sys');
var exec = require('child_process').exec;

const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const isDevMode = process.env.NODE_ENV === 'development';
const request = require('request')
const { activeFields } = require('./src/core/fields');
const bodyParser = require('body-parser');

app.use(require('morgan')('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

(function initWebpack() {
  const webpack = require('webpack');
  const webpackConfig = require('./config/webpack/common.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  }));

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }));

  app.use(express.static(__dirname + '/'));
})();

app.get("/contracts/*", function root(req, res) {
  res.sendFile(__dirname + '/build/contracts/' + req.params[0]);
});

app.get("/storeInIPFS", (req, res) => {
  //res.send(exec('ipfs add'));
  var responseObj = [];
  console.log(req.query);
  exec("/home/osboxes/mybin/add-ipfs " + req.query.content, function(err, stdout, stderr) {
    console.log(stdout);    
    res.contentType("text");
    res.send(stdout);
  })  
});

app.post("/storeInIPFS", (req, res) => {
  //res.send(exec('ipfs add'));
  var responseObj = [];
  console.log(req.body);
  exec("/home/osboxes/mybin/add-ipfs '" + JSON.stringify(req.body) + "'", function(err, stdout, stderr) {
    console.log(stdout);    
    res.contentType("text");
    res.send(stdout);
  })  
});

app.post("/saveResume", (req, res) => {
  //res.send(exec('ipfs add'));
  var responseObj = [];
  console.log(req.body);

  let publicData = activeFields.Public;
  let privateData = activeFields.Private;

  let publicResume = {};
  let privateCategories = {};

  let completed = 1; // for public data

  publicData.forEach((i)=>{
    publicResume[i.field] = req.body[i.field];
  });

  var categories = [];

  privateData.forEach((i)=>{
    if (!privateCategories[i.category]) {
      privateCategories[i.category] = {};
      completed ++; 
      categories.push(i.category);
    }
    privateCategories[i.category][i.field] = req.body[i.field];
  });

  var completedRecords = {};
  console.log("Total Completed is", completed, categories);

  var completedWriter = (key, stdout)=>{
    console.log("Error>", stdout);  
    let hash = JSON.parse(stdout).Hash;  
    completedRecords[key] = hash; //stdout.split(" ")[2].trim();
    completed --;
    if (completed > 0) {
      return;
    }   
    console.log("Writing to out", completedRecords);
    res.contentType("application/json");
    res.send(JSON.stringify(completedRecords));    
  }

  console.log(publicResume, privateCategories);
  categories.forEach((k)=>{
    console.log("Writing ", JSON.stringify(privateCategories[k]), k);
    exec("/home/osboxes/mybin/add-ipfs '" + JSON.stringify(privateCategories[k]) + "'", function(err, stdout, stderr) {    
        completedWriter(k, stdout);
    });
  })
  console.log("Writing ", JSON.stringify(publicResume));
  exec("/home/osboxes/mybin/add-ipfs '" + JSON.stringify(publicResume) + "'", function(err, stdout, stderr) {
    completedWriter("publicInfo", stdout);
  })  
});

app.get("/loadFromIPFS", (req, res) => {
  var q = JSON.parse(req.query.items);
  var done = {};
  var expected = q.length;

  q.forEach((i)=>{
    var e = i;
    console.log("Input is ", e);
    https.get("https://ipfs.infura.io:5001/api/v0/cat/" + e, (resp) => {
      
      let data = '';
      resp.on("data", (chunk) => {
        data += chunk;
      })
      resp.on("end", () => {
        console.log("Done is", data);
        done[e] = data;
        expected --;  
        if (expected == 0) {
          res.send(done);
        }
      })
    });    
  });
});

app.get("/getFromIPFS", (req, res) => {
  https.get("https://ipfs.infura.io:5001/api/v0/cat/" + req.query.identifier, (resp) => {
    let data = '';
    resp.on("data", (chunk)=>{
      data += chunk;
    })
    resp.on('end', () => {
      console.log(data);
      res.send(data);
    })
    
    
  });
});

app.get("/jobcoin/:fileName", (req, res) => {
  console.log(req.params);
  res.sendFile(__dirname + '/src/' + req.params.fileName);
});

app.get("/run", function root(req, res) {
  res.sendFile(__dirname + '/src/UploadCV.html');
});

app.get("/employ", function root(req, res) {
  res.sendFile(__dirname + '/src/RegisterEmployer.html');
});

app.get("/institute", function root(req, res) {
  res.sendFile(__dirname + '/src/RegisterInstitute.html');
});

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
