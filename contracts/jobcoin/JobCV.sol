pragma solidity ^0.4.4;

import "./../zeppelin/lifecycle/Killable.sol";

/**
 * This represents a persons' CV
 * For now we have the following information:
 * - name
 * - dob
 * - email
 * - phone
 * - address
 * - information blurb
 * - job history
 * - education history
 * - friends list
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
     * this is un-encrypted
     * this is a reference to a ipfs shared source
     * name, description
     */
    string private publicData;

    /**
     * Encrypted information
     * this is a reference to a ipfs shared source (but encrypted)
     * email, contact
     */
    string private sensitiveData;

    /**
     * Encrypted information
     * this is a reference to a ipfs shared source pertaining to their job history reference
     */
    string private jobHistoryRef;

    /**
     * Encrytpted information
     * this is a reference to a ipfs shared source pertaining to their education history 
     *
     */
    
    string private educationRef;

    /**
     * Encrypted information
     * this is a list of references for a particular cv. It points to an ipfs endpoint 
     * holding the encrypted data
     */
    string private referencesRef;

    /**
     * This is information stored in public for all to see. Its a json object that anyone can
     * read. 
     */
    function getPublicDetails() returns(string) {
        return publicData;
    }

    /**
     * This is sensitive data that only owners can get
     * technically anyone can read this data since its on the blockchain, but because
     * its encrypted anyway people won't be able to read the data
     */
    function getSensitiveData() onlyOwner returns(string) {
        return sensitiveData;
    }

    function getSensitive2() returns(string) {
        return sensitiveData;
    }

    /** update our resume */

    function updateSensitiveData(string sensitive) onlyOwner {
        sensitiveData = sensitive;
    }

    function updateReferences(string ref) onlyOwner {
        referencesRef = ref;
    }

    function updateJobHistory(string hist) onlyOwner {
        jobHistoryRef = hist;
    }

    function updateEducationHistory(string education) onlyOwner {
        educationRef = education;
    }

    function updatePublicInfo(string publicInfo) onlyOwner {
        publicData = publicInfo;
    }

    function getResumeDetails() onlyOwner returns(string, string, string, string, string) {
        return (publicData, sensitiveData, jobHistoryRef, educationRef, referencesRef);
    }

    /** update resume in one go */
    function updateResume(string sensitive, string ref, string hist, string education, string publicInfo) onlyOwner {
        sensitiveData = sensitive;
        referencesRef = ref;
        jobHistoryRef = hist;
        educationRef = education;
        publicData = publicInfo;
    }
}