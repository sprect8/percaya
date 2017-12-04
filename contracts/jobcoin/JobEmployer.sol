pragma solidity ^0.4.4;

import "./CertifierSource.sol";
import "./EscrowService.sol";

/**
 * This represents the educational institutes
 * It is a signing authority
 */
contract JobEmployer is CertifierSource {
    /**
     * All information related to the employer
     * Name     
     * Headquarters
     * Contact
     * Email
     * Industry
     * 
     */
    string private publicData;

    EscrowService private escrowService;
    
    function JobEmployer(address esAddress) {
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