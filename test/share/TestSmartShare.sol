pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../../contracts/share/SmartShare.sol";

contract TestSmartShare {
    SmartShare share = SmartShare(DeployedAddresses.SmartShare());
    mapping(address => uint) pendingPayments;
    address milad = 0x536c01F0505f847bdB0CbE2c70abA36af4f9D3f4;
    address zain = 0x9687b825a12De8eaf4C170D2e66E6A9C4FcF22d1;
    address lohith = 0x986926e75DA24Cb981b4cCbc2a94A1c6Cd5D80Ae;
    address yusuf = 0xFb308827cE502B0338984cb6f4c819C36Fa56b77;
    address russel = 0xfb8bF934D7A2FC5aaDDB019CBa71d57b8eD8c35E;
    address atif = 0xcBBb5Ad456E8Fba1A91e42D95221f7Ae6B87B488;
    address yong = 0x51608e7D6D81b16905921e9d8Fbb0c4609B6ec34;
    

    //uint public initialBalance = 1000 ether;

    function testShareProfit() {
        
    }

    function testWithdraw() {

    }

    function testRegister() {
        address expected = msg.sender;
        address owner = share.getOwner();
        Assert.equal(expected, owner, "Not Same Owner");
        // create 7 arbitrary accounts
        //        
        share.registerMilad(milad);
        share.registerZain(zain);
        share.registerLohith(lohith);
        share.registerYusuf(yusuf);
        share.registerRussel(russel);
        share.registerAtif(atif);
        share.registerYong(yong);

        //address[7] memory investors = share.getInvestors();
        
        pendingPayments[milad] = 1;
        pendingPayments[zain] = 1;
        pendingPayments[lohith] = 1;
        pendingPayments[yusuf] = 1;
        pendingPayments[russel] = 1;
        pendingPayments[atif] = 1;
        pendingPayments[yong] = 1;

        /*for (uint index = 0; index < investors.length; index++) {
            Assert.equal(investors[index], 0x0000000000000000000000000000000000000000, "Investor not found ");
        }*/
        /*
        address[7] investorRegister = [0x536c01f0505f847bdb0cbe2c70aba36af4f9d3f4,
        0x9687b825a12de8eaf4c170d2e66e6a9c4fcf22d1,
        0x986926e75da24cb981b4ccbc2a94a1c6cd5d80ae,
        0xfb308827ce502b0338984cb6f4c819c36fa56b77,
        0xfb8bf934d7a2fc5aaddb019cba71d57b8ed8c35e,
        0xcbbb5ad456e8fba1a91e42d95221f7ae6b87b488,
        0x51608e7d6d81b16905921e9d8fbb0c4609b6ec34];
        for (var index = 0; index < investors.length; index++) {
            Assert.isTrue(investorRegister.indexOf(investors[index]) < 0, "Failed because investor not found");
                
                        
        }*/

        
    }
}