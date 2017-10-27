pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";

/**
 * This represents a persons' CV
 * 
 */
contract JobCV is Killable {
  /**
   * CV Rate, adjustable based on number of visits
   */
   uint256 visitCost = 1;


  /**
   * JobCV Oracle
   *
   * Not owner of the contract but the entity which helped setup this Contract
   * Oracle is created on contract initialisation and cannot be changed
   * They are paid a tiny percentage of the amount that people pay to access
   * details pertaining to this smart contract 
   **/

    address oracle;

    uint256 private pendingPayments;

    /*
     * Simple User Details
     *
     */

    string fname;
    string lname;

    string email;
        

  function withdrawProfit() onlyInvestor returns(bool) {
      // withdraw funds
      uint256 share = pendingPayments[msg.sender];
      pendingPayments[msg.sender] = 0;

      if (!msg.sender.send(share)) {
          pendingPayments[msg.sender] = share;
          return false;
      }
      ShareWithdrawn(share, msg.sender);

      return true;
  }
}