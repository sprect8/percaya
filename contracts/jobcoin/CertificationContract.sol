pragma solidity ^0.4.2;
import "./../zeppelin/lifecycle/Killable.sol";
/**
 * This defines an agreement between parties for the purpose of signing / certifying information
 * Upon creation of contract we will supply the cvSource, the requester, and the certifierSource
 *
 * Contract will also have a cost associated, and the certifierSource can withdraw from the contract
 * only after they have verified
 */
contract CertificationContract is Killable{    
    address private cvSource;
    address private requester;
    address private certifierSource;

    
}
