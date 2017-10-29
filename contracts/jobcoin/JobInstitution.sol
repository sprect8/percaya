pragma solidity ^0.4.4;

import "./CertifierSource.sol";

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