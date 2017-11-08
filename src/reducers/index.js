
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import addressReducer from './address_reducer';
import performanceHistoryReducer from './performance-history_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  address: addressReducer,
  performanceHistory: performanceHistoryReducer,
  form: formReducer
});

export default rootReducer;
