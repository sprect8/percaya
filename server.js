const sys = require('sys');
var exec = require('child_process').exec;

const http = require('http');
const express = require('express');
const app = express();
const isDevMode = process.env.NODE_ENV === 'development';
const request = require('request')

app.use(require('morgan')('short'));

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

app.get("/getFromIPFS", (req, res) => {
  http.get("http://localhost:8080/ipfs/" + req.query.identifier, (resp) => {
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

app.get(/.*/, function root(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
  const address = server.address();
  console.log('Listening on: %j', address);
  console.log(' -> that probably means: http://localhost:%d', address.port);
});
