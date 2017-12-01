import constants from 'core/types';
import Const from 'core/const';

/**
 * Contract Actions
 * Loading / Loaded
 * Updating / Update
 * Creating / Created
 * Contract Address
 * Error / Issues
 */
export function contractLoading() {  
  return {
    currentState  : Const.LOADING,
    contract      : null,
    error         : null,
    type          : constants.CONTRACT_STATE
  };
}

export function updateContract(contractObj, details, address) {
  return function(dispatch) {
    dispatch(contractUpdating());

    return contractObj.updateResume(details.sensitive, 
      details.ref, 
      details.hist, 
      details.education, 
      details.publicInfo, 
      {from: address}
    ).then(json=>dispatch(contractUpdated()));
  }; 
}

export function creatingContract(oracleObj, details, address) {
  return function(dispatch) {
    dispatch(contractCreating());

    return oracleObj.deployJCV(details.sensitive, 
      details.ref, 
      details.hist, 
      details.education, 
      details.publicInfo,
      {from: address})
    .then(json=>dispatch(contractCreated()));
  };
}

// set the details for the users' CV
// at any point this can be set, after which 
// we can save the cv
export function setContractDetails(details) {
  return {
    cvDetails     : details,
    type          : constants.CONTRACT_DETAILS
  }
}

export function setCurrentCoinBase(addr, amount) {
  return {
    coinbase : addr,
    amount   : amount,
    type     : constants.CONTRACT_BASE,    
  }
}

// contract can be null if there is no existing contract
// note the result is just the contract address, not actual contract details
// error empty (null) if no error
export function contractLoaded(contract, error) {
  return {
    currentState  : Const.LOADED,
    contract      : contract,
    error         : error,
    type          : constants.CONTRACT_STATE
  };
}

// updating an existing contract
export function contractUpdating() {
  return {
    currentState  : Const.UPDATING,    
    type          : constants.CONTRACT_STATE
  };
}

// contract updated
// error if issues occur otherwise null / empty string
export function contractUpdated(error) {
  return {
    currentState  : Const.UPDATED,    
    error         : error,
    type          : constants.CONTRACT_STATE
  }
}

// this is called when the state of the system is 'new'
export function setContractNewState() {
  return {
    currentState  : Const.NEW_CONTRACT,
    error         : null,
    contract      : null,
    type          : constants.CONTRACT_STATE
  };
}

// this is called when the state of the system is 'new'
export function setContractEditState() {
  return {
    currentState  : Const.EDIT_CONTRACT,
    error         : null,
    type          : constants.CONTRACT_STATE
  };
}


// creating a new contract
export function contractCreating() {
  return {
    currentState  : Const.CREATING,  
    type          : constants.CONTRACT_STATE
  };
}

// contract created (contract set to contract address)
// error if issues occur otherwise null / empty string
export function contractCreated(contract, error) {
  return {
    currentState  : Const.CREATED,    
    error         : error,
    contract      : contract,
    type          : constants.CONTRACT_STATE
  }
}