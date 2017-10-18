pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";


contract Adoption is Killable {
  /**
   * 16 adoptable puppies up for grabs
   */
  address[16] public adopters;

  /**
   * Function that allows anyone to adopt a pet
   * Select which pet you wish to adopt and the caller will auto-adopt the pet
   * 
   * adopters is modified if the petid is within range
   * sender of the message will adopt the pet 
   *
   * @param petId {uint} pet to adopt
   * @return uint petId 
   * 
   **/
  function adopt(uint petId) public returns (uint) {
      require(petId >= 0 && petId <= 15);
      adopters[petId] = msg.sender;

      return petId;
  }

  function getAdopters() public returns (address[16]) {
      return adopters;
  }
}