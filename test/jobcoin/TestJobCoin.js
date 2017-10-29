var JobCVOracle = artifacts.require("JobCVOracle");

contract('JobCVOracle', function(acc) {
    var jobcv;
    it("should be able to create new contract", function() { 
        return JobCVOracle.deployed().then(function(instance) {
            jobcv = instance;
                        
        });
    });
});