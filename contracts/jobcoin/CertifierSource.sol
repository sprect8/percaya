pragma solidity ^0.4.2;
import "./../zeppelin/lifecycle/Killable.sol";
/**
 * This is a contract for Employers (companies) as well as Institutions (Education / Training / etc) 
 * to provide a signed certificate as requested by an individual
 *
 */
contract CertifierSource is Killable{    
  // how much it costs for someone to certify  
  uint128 private certificationCost = 1;
  
  function setCertCost (uint128 newCost) onlyOwner {
      certificationCost = newCost;
  }

  function withdrawFunds() onlyOwner {
      // transfer to owner
      if (this.balance > 0) {
          msg.sender.send(this.balance);
      }
  }

  function certificationRequest(address certificationContract) {
      
  }
}
