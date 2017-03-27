// eslint-disable-next-line
import configureMockStore from 'redux-mock-store';
import {
  ACTIONS,
  middleware as apiCallMiddleware,
} from 'redux-api-call';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../state/rootEpic';

// eslint-disable-next-line
jest.unmock('redux-api-call');

const defaultReducers = {
  api_calls: {},
};

const epicMiddleware = createEpicMiddleware(rootEpic);

const mockStore = (initState) => {
  const middlewares = [
    apiCallMiddleware(),
    epicMiddleware,
    thunkMiddleware,
  ];

  const reducers = {
    ...defaultReducers,
    ...initState,
  };
  return configureMockStore(middlewares)(reducers);
};

const generateApiCallState = (actionType, successData) => ({
  api_calls: {
    [actionType]: {
      isFetching: false,
      isInvalidated: false,
      error: null,
      data: successData,
    },
  },
});

const testMakeFetchAction = (initState, actionCreatorFactory, expectedPayload) => {
  const store = mockStore(initState);
  const actual = actionCreatorFactory();
  store.dispatch(actual);
  const startAction = store.getActions()[0];
  const actualPayload = startAction.payload;
  // eslint-disable-next-line
  expect(actualPayload).toMatchObject(expectedPayload);
};

const mockCompleteAction = (actionType, jsonResult) => ({
  type: ACTIONS.COMPLETE,
  payload: {
    name: actionType,
    json: jsonResult,
  },
});

export {
  mockStore,
  generateApiCallState,
  mockCompleteAction,
  testMakeFetchAction,
};
