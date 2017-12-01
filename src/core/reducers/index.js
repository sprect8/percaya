import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import { providerReducer } from 'core/reducers/reducer-provider';
import { contractReducer } from 'core/reducers/reducer-contract-ui-state';

const rootReducer = combineReducers({
  ui      : uiReducer,
  provider: providerReducer,
  contract: contractReducer
});

export default rootReducer;
