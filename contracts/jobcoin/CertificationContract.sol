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
    }

    mapping(address => ServiceObj[]) private escrow;
    mapping(address => mapping(address => string)) private responded; // person with cv -> person / company requesting cv
    mapping(address => address[]) private requests; // person / company requesting cv -> cvs requested    

    uint256 private upkeepFees = 0; // fees we have access to per txn made from the escrow; used for maintenance
    
    modifier costs(uint price) {
        if (msg.value >= price) {
            _;
        }
    }
    
    function getRequestedData(address target) returns (string) {                
        // return the requested data
        return responded[target][msg.sender];
    }

    function cleanupRequests() { 
        // remove requests that are done
        // includes removing the escrow, the responded, and the requests
    }    

    // get list of processed data
    function getProcessedData() returns (address[]) {
        address[] storage processed;

        for (uint256 i = 0; i < requests[msg.sender].length; i ++) {
            // requests[msg.sender][i] is the current request address i sent to
            // responded[above] is response
            if (bytes(responded[requests[msg.sender][i]][msg.sender]).length > 0) {
                processed.push(requests[msg.sender][i]);
            }
        }

        return processed;
    }

    /**
     * Caller should put the promised hash of the target along with the target
     * Promised hash is the actual hash of the real data (not encrypted)
     *
     */
    function requestService(address target, bytes32 hashRes) payable costs(1000000) {        
        escrow[target].push(ServiceObj(msg.sender, hashRes)); 
        requests[msg.sender].push(target); // add to our requests, we will reference this later  
        upkeepFees += 10000;     

        responded[target][msg.sender] = "";
    }

    /**
     * I will deliver the information and flag to the sender, i will also take the money
     */
    function deliverResults(address target, string ipfsTarget) {
        responded[msg.sender][target] = ipfsTarget; // sender is the actual owner of the cv; target is who we responded to
        
        for (uint256 i = 0; i < escrow[msg.sender].length; i++) {
            if (escrow[msg.sender][i].requestor == target) {
                delete escrow[msg.sender][i];
                if (i < escrow[msg.sender].length - 1) {
                  escrow[msg.sender][i] = escrow[msg.sender][escrow[msg.sender].length - 1];
                  escrow[msg.sender].length --;
                }
                break;
            }
        }
        msg.sender.transfer(990000); // send 990k, we keep 10k for upkeep
    }

    /**
     * Find first 100
     */

    function getRequests(uint256 offset) returns (address[]) {
        address[] storage add;
        
        // paging, get offset + 100 items requested

        for (uint256 i = offset; i < offset + 100 && i < escrow[msg.sender].length; i++) {
            if (bytes(responded[msg.sender][escrow[msg.sender][i].requestor]).length == 0) {
                add.push(escrow[msg.sender][i].requestor);
            }
        }
        return add;
    }
}
