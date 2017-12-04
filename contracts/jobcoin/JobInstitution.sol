pragma solidity ^0.4.4;

import "./CertifierSource.sol";
import "./EscrowService.sol";

/**
 * This represents the educational institutes
 * It is a signing authority
 */
contract JobInstitution is CertifierSource {
   /**
     * All information related to the employer
     * University Name
     * Contact
     * Email
     * Location
     */
    string private publicData;
    EscrowService private escrowService;
    
    function JobInstitution(address esAddress) {
        escrowService = EscrowService(esAddress);
    }

    function updateData(string publicInfo) onlyOwner {
        publicData = publicInfo;
    }

    /**
     * get information related to public data
     */
    function getPublicData() returns(string) {
        return publicData;
    }
}