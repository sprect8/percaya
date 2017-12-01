import constants from 'core/types';

const initialState = {
  provider: null
};

export function contractReducer(state = initialState, action) {
  switch (action.type) {   
    case constants.CONTRACT_BASE:
    return Object.assign({}, state, {
      coinbase      : action.coinbase,
      amount        : action.amount   
    });

    case constants.CONTRACT_DETAILS:
    return Object.assign({}, state, {
      details       : action.details      
    });

    case constants.CONTRACT_STATE:
    console.log(action);

    return Object.assign({}, state, {
      error         : action.error,
      contract      : action.contract,
      currentState  : action.currentState,       
    });

    default:
      return state;
  }
}