var SmartShare = artifacts.require("SmartShare");

contract('SmartShare', function(acc) {
    var smartShare;
    it("should register investor using user address for acc[1] - acc[7]", function() { 
        return SmartShare.deployed().then(function(instance) {
            smartShare = instance;
            instance.registerMilad(acc[1]);
            instance.registerZain(acc[2]);
            instance.registerRussel(acc[3]);
            instance.registerAtif(acc[4]);
            instance.registerYusuf(acc[5]);
            instance.registerLohith(acc[6]);
            instance.registerYong(acc[7]);

            var accMap = {};
            acc.forEach(function(d, idx) {
                accMap[d] = 1;
            })

           /* instance.getInvestors.call().then(function(result) {
                console.log(result);                
                result.forEach(function(d) {
                    assert.equal(accMap[d], 1);
                });
            });*/
        });
        
    }); 
    
    it("should deduct funds when i call deposit", function() {
        //console.log("Balance is " + smartShare.owner);

        console.log("SM", smartShare.address, web3.fromWei(web3.eth.getBalance(smartShare.address), 'ether').toNumber());

        smartShare.getOwner.call().then(function(cb) {
            var startBalance = web3.fromWei(web3.eth.getBalance(cb), 'ether').toNumber();
            console.log("Owner is: ", cb, startBalance);
            smartShare.shareProfit({from:cb, to:smartShare.address, value: web3.toWei(1, "ether")})
            .then(function(tx) {
                var endBalance = web3.fromWei(web3.eth.getBalance(cb), 'ether').toNumber();
                console.log("Profit shared", cb, web3.fromWei(web3.eth.getBalance(cb), 'ether').toNumber());
                console.log("Start Balance", startBalance, endBalance);
                assert.equal(startBalance > endBalance, true);

                console.log("SM-Before Test", smartShare.address, web3.fromWei(web3.eth.getBalance(smartShare.address), 'ether').toNumber());               

                assert.equal(web3.fromWei(web3.eth.getBalance(smartShare.address), 'ether').toNumber() > 0, true);                
                startBalance = web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber();

                smartShare.getPendingPayment.call({from:acc[1]}).then(function(done) {
                    console.log("Pending: ", web3.fromWei(done, 'ether').toNumber());
                });

                // withdraw profits
                smartShare.withdrawProfit({from:acc[1]}).then(function(done) {
                    console.log("Done", done);
                    var endBalance = web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber();
                    console.log("SM-After Test", smartShare.address, web3.fromWei(web3.eth.getBalance(smartShare.address), 'ether').toNumber());
                    console.log(startBalance, "=>", endBalance);
                    assert.equal(startBalance < endBalance, true);
                });
            });            
        });        
    });
});