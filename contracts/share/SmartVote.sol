pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";


contract SmartShare is Killable {
  /**
   * Distribution of funds for different users
   * Milad 
   * Zain
   * Russel
   * Lohith
   * Yusuf
   * Atif
   * Yong
   * 14.28 each share
   */

  //address[7] private investors;

  struct Investor {
      address investor;
      uint256 share;
  }

  Investor[7] private investors;

  mapping(address => uint256) private pendingPayments; 

  uint256 investment = 15200;
  uint256 share1200 = 1200;
  uint256 share2000 = 2000;
  uint256 share3000 = 3000;

  event PaymentMade(uint256 shareAmount);

  event ShareWithdrawn(uint256 shareAmount, address investor);

  event AddressRegistered(address addressRegistered);

  /*function getInvestors() returns (Investor[7]) {
      return investors;
  }*/

  function registerInvestor(address investor, uint256 share, uint256 id) private {
      investors[id] = Investor({investor:investor, share:share});
  }

  function registerMilad(address milad) onlyOwner {
      // milad has 2000 / 15600      
      uint256 share = share2000; //0.1315;
      registerInvestor(milad, share, 0);
      pendingPayments[milad] = 0;
      AddressRegistered(milad);
  }
  function registerZain(address zain) onlyOwner {
      uint256 share = share3000; //0.1315;
      registerInvestor(zain, share, 1);
      pendingPayments[zain] = 0;
      AddressRegistered(zain);
  }
  function registerRussel(address russel) onlyOwner {
      uint256 share = share3000; //0.1315;
      registerInvestor(russel, share, 2);      
      pendingPayments[russel] = 0;
      AddressRegistered(russel);
  }
  function registerLohith(address lohith) onlyOwner {
      uint256 share = share2000; //0.1315;
      registerInvestor(lohith, share, 3);
      
      pendingPayments[lohith] = 0;
      AddressRegistered(lohith);
  }
  function registerYusuf(address yusuf) onlyOwner {
      uint256 share = share1200; //0.1315;
      registerInvestor(yusuf, share, 4);
      
      pendingPayments[yusuf] = 0;
      AddressRegistered(yusuf);
  }
  function registerAtif(address atif) onlyOwner {
      uint256 share = share2000; //0.1315;
      registerInvestor(atif, share, 5);
      
      pendingPayments[atif] = 0;
      AddressRegistered(atif);
  }
  function registerYong(address yong) onlyOwner {
      uint256 share = share2000; //0.1315;
      registerInvestor(yong, share, 6);
      
      pendingPayments[yong] = 0;
      AddressRegistered(yong);
  }
  modifier onlyInvestor() {           
    if (pendingPayments[msg.sender] > 0)
      _;    
  }

  function shareProfit() onlyOwner payable {
      // share the profit of the owner to the 7 addresses based on equal share of 14.28
      // get owner balance    
      uint256 share = msg.value;  
      
      for (uint256 index = 0; index < investors.length; index++) {
          uint256 invested = investors[index].share;
          pendingPayments[investors[index].investor] = pendingPayments[investors[index].investor] + invested * share / investment; 
      }

      // payment complete, notify the users somehow? maybe off-chain
      PaymentMade(msg.value);
  }

  function getPendingPayment() returns (uint256) {
      return pendingPayments[msg.sender];
  }

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