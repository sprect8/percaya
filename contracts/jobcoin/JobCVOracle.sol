pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";

import "./JCV.sol";

/**
 * This is our presence on the network
 * From this smart contract all others will be created
 * Officially the owner of the smart contracts for all cvs; however 
 * we delegate ownership to the address supplied
 */
contract JobCVOracle is Killable {  

  /**
   * Someone online would like to deploy a new smart-contract
   * Given their address we create them a new JCV smart contract
   *
   * This is returned as an address, which we can then use to interact
   * with the CV
   */
  function deployJCV (address owner, 
                      string publicInfo, 
                      string sensitive,
                      string hist,
                      string education,
                      string ref) returns (address) {
    
    JobCV jobCV = new JobCV();
    jobCV.updateResume(sensitive, ref, hist, education, publicInfo);
    jobCV.transferOwnership(owner);    


    return address(jobCV);
  }

  /**
   * We need some way to verify a given institution
   * based on their ethereum address
   * 
   * We can do this by linking to real world, either through email
   * or some other form
   */
  function registerInstitution (address owner) returns (address) {

  }

  /**
   * We register an employer using certain key fields
   */
  function registerEmployer(address owner) {

  }
}