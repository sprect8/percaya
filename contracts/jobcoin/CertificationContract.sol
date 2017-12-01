pragma solidity ^0.4.2;
import "./../zeppelin/lifecycle/Killable.sol";
/**
 * Escrow Service between different smart contracts
 * User stores hash of their private data and location
 */
contract EscrowService is Killable {    
    struct ServiceObj {
        address requestor;
        bytes32 hashRes;
        bool done;
    }

    mapping(address => ServiceObj[]) private escrow;

    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }


    /**
     * Caller should put the promised hash of the target along with the target
     * Promised hash is the actual hash of the real data (not encrypted)
     *
     */
    function requestService(address target, bytes32 hashRes) payable costs(1000000) {
        escrow[target].push(ServiceObj(msg.sender, hashRes, false));
    }

    /**
     * I will deliver the information and flag to the sender that i have received the money
     */
    function deliverResults() {
        
    }

    function getRequests() returns (address[]) {
        address[] storage add;
        for (uint256 i = 0; i < escrow[msg.sender].length; i++) {
            if (!escrow[msg.sender][i].done) {
                add.push(escrow[msg.sender][i].requestor);
            }
        }
        return add;
    }
}
