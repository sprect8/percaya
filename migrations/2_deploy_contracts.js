//var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
//var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
//var Authentication = artifacts.require("./Authentication.sol");
//var Adoption = artifacts.require("./petstore/Adoption.sol")
var SmartShare = artifacts.require("./share/SmartShare.sol")
var JobCVOracle = artifacts.require("./jobcoin/JobCVOracle.sol")
var JobCV = artifacts.require("./jobcoin/JobCV.sol")
var JobEmployer = artifacts.require("./jobcoin/JobEmployer.sol")
var JobInstitution = artifacts.require("./jobcoin/JobInstitution.sol")
var EscrowService = artifacts.require("./jobcoin/EscrowService.sol")

module.exports = function(deployer) {
  /*deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);*/
  //deployer.deploy(Adoption);
  deployer.deploy(SmartShare);
  deployer.deploy(JobCVOracle);
  deployer.deploy(JobCV);
  deployer.deploy(JobEmployer);
  deployer.deploy(JobInstitution);
  deployer.deploy(EscrowService);
};
