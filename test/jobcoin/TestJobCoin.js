var JobCVOracle = artifacts.require("JobCVOracle");

contract('JobCVOracle', function(acc) {
    //JobCVOracle.detaults({from:acc[0]});
    var jobcv;
    console.log("Creating stuff");
    /*it("should be able to create new contract", function() { 
        return JobCVOracle.deployed().then(function(instance) {
            jobcv = instance;
            console.log("Instance obtained");

            /*jobcv.deployJCV().then((x)=>{
                //console.log("My Result is : ", x, web3.eth.getCode(x));
                jobcv.getJCV({from:acc[0]}).then((x)=>{
                    console.log(x);
                    web3.eth.getCoinbase((e, addr) => {
                        console.log("My Addr", addr);
                    });
                    console.log(web3.eth.getCode(x));//.then(console.log);
                })
            }).catch((e)=>{
                console.log("Fucked", e)
            });*/
        /*});
    });*/
});

