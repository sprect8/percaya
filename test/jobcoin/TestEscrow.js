var EscrowService = artifacts.require("EscrowService");

contract('EscrowService', function(acc) {
    //JobCVOracle.detaults({from:acc[0]});
    
    console.log("Creating stuff");
    it("should be able to create new contract", function() { 
        return EscrowService.deployed().then(function(instance) {
            console.log("Instance obtained lah");      
            
            /*instance.getProcessedData.call().then(function(e) {
                console.log("Empty >> ", e);
            });*/
            console.log(web3.fromWei(1, 'finney'));
            instance.getFinney.call().then(console.log);
            instance.requestData(acc[1], 100, {from:acc[0], value: web3.toWei(3, 'finney')}).then((x)=>{
                console.log("Blarg", x);
                console.log("CV Owner Balance", web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber());
                instance.getRequests.call(0, {from:acc[1]}).then((x)=>{                    
                    console.log("Contract Balance", web3.fromWei(web3.eth.getBalance(instance.address), 'ether').toNumber());
                    console.log("CV Owner Balance", web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber());

                    instance.deliverData(x[0], "Done", {from:acc[1]}).then((x) => {
                        console.log("Done Delivering data, did my balance increase?");
                        console.log("CV Owner Balance", web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber());
                        console.log("Contract Balance", web3.fromWei(web3.eth.getBalance(instance.address), 'ether').toNumber());

                        instance.getUpkeepFees.call().then((x) => {
                            console.log("ACC FEES", x);
                        });          
                        instance.getRequests.call(0, {from:acc[1]}).then(console.log);
                    })
                });                
                console.log(web3.fromWei(web3.eth.getBalance(instance.address), 'wei').toNumber());
            });

        });
    });
});