var JobCVOracle = artifacts.require("JobCVOracle");

contract('JobCVOracle', function(acc) {
    var jobcv;
    it("should be able to create new contract", function() { 
        return JobCVOracle.deployed().then(function(instance) {
            jobcv = instance;
            jobcv.deployJCV.call(acc[1], "Zain", "0123123123", "Clarity", "University of Sydney", "Russel").then((x)=>{
                console.log("My Result is : ", x, web3.eth.getCode(x));
            });
        });
    });
});