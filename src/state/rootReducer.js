import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';
import { routerReducer } from 'react-router-redux';

// States
import { branch as appBranch } from '../components/App/state';

export const rootReducer = combineReducers({
  router: routerReducer,
  ...apiReducers,
  ...appBranch,
});

export default rootReducer;
