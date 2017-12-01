import constants from 'core/types';

const initialState = {
  provider: null
};

export function providerReducer(state = initialState, action) {
  switch (action.type) {

  case constants.SPECIFY_PROVIDER:
    return Object.assign({}, state, {
      provider: action.provider
    });

  case constants.SPECIFY_ORACLE:
    return Object.assign({}, state, {
      oracle: action.oracle
    })
  case constants.SPECIFY_CV_NBI:
    return Object.assign({}, state, {
      cvNBI : action.nbi
    });

  default:
    return state;
  }
}