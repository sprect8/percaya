pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";

import "./JobCV.sol";
import "./JobEmployer.sol";
import "./JobInstitution.sol";
import "./EscrowService.sol";

/**
 * This is our presence on the network
 * From this smart contract all others will be created
 * Officially the owner of the smart contracts for all cvs; however 
 * we delegate ownership to the address supplied
 */
contract JobCVOracle is Killable {    
  mapping(address => address) private deployedCVs; 
  mapping(address => address) private registeredEmployers;
  mapping(address => address) private registeredInstitutes;

  address[] private employers;
  address[] private institutes;
  
  // Every CV, Every employer, Every Institute shares a single escrow service
  EscrowService private escrowService = new EscrowService();

  /**
   * Someone online would like to deploy a new smart-contract
   * Given their address we create them a new JCV smart contract
   *
   * This is returned as an address, which we can then use to interact
   * with the CV
   */
  function deployJCV (string sensitive, string ref, string hist, string education, string publicInfo) payable returns (address) {
    JobCV jobCV = new JobCV(address(escrowService));
    jobCV.updateResume(sensitive, ref, hist, education, publicInfo);
    jobCV.transferOwnership(msg.sender);    
        
    deployedCVs[msg.sender] = address(jobCV);
    return address(jobCV);    
  }

  function getJCV() constant returns (address) {
    return deployedCVs[msg.sender];
  }

  function getInstitute() constant returns (address) {
    return registeredInstitutes[msg.sender];
  }

  function getEmployer() constant returns (address) {
    return registeredEmployers[msg.sender];
  }

  /**
   * We need some way to verify a given institution
   * based on their ethereum address
   * 
   * We can do this by linking to real world, either through email
   * or some other form
   */
  function registerInstitution (string publicInfo) returns (address) {
    JobInstitution inst = new JobInstitution(address(escrowService));
    inst.updateData(publicInfo);    
    inst.transferOwnership(msg.sender);

    registeredInstitutes[msg.sender] = address(inst);
    institutes.push(address(inst));
    return address(inst);            
  }

  /**
   * We register an employer using certain key fields
   */
  function registerEmployer(string publicInfo) returns (address) {
    JobEmployer employer = new JobEmployer(address(escrowService));
    employer.updateData(publicInfo);
    employer.transferOwnership(msg.sender);
    registeredEmployers[msg.sender] = address(employer);
    employers.push(address(employer));
    return address(employer);
  }

  function getRegisteredEmployers() returns (address[]) {
    return employers;
  }

  function getRegisteredInstitutes() returns (address[]) {
    return institutes;
  }
}