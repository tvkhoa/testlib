import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { compact } from 'lodash';
import thunk from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { middleware as apiCallMiddleware } from 'redux-api-call';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { rootReducer } from './rootReducer';
import rootEpic from './rootEpic';

const epicMiddleware = createEpicMiddleware(rootEpic);

const fetchAdapter = ({
  endpoint,
  headers,
  ...others
}) => {
  const newHeader = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    ...(headers || {}),
  };
  return fetch(endpoint, {
    ...others,
    headers: newHeader,
    mode: 'cors',
  }).then(res => Promise.resolve({
    ok: res.ok,
    json() {
      return res.json().then(
        (json) => {
          if (res.ok) {
            return json;
          }
          return {
            status: res.status,
            ...json,
          };
        },
        err => new Error(`Error when parsing ${err}`),
      );
    },
  }));
};

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const enhancers = compact([
  applyMiddleware(
    thunk,
    apiCallMiddleware(fetchAdapter),
    epicMiddleware,
    routerMiddleware(history),
  ),
  // Redux Dev Tools store enhancer.
  // @see https://github.com/zalmoxisus/redux-devtools-extension
  // We only want this enhancer enabled for development and when in a browser
  // with the extension installed.
  typeof window !== 'undefined'
    && typeof window.devToolsExtension !== 'undefined'
    // Call the brower extension function to create the enhancer.
    ? window.devToolsExtension()
    // Else we return a no-op function.
    : f => f,
]);

export const configureStore = (initialState) => {
  const store = initialState
    ? createReduxStore(rootReducer, initialState, compose(...enhancers))
    : createReduxStore(rootReducer, compose(...enhancers));

  // Enable Webpack hot module replacement for reducers. This is so that we
  // don't lose all of our current application state during hot reloading.

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
      // eslint-disable-next-line global-require, import/newline-after-import
      const nextReducer = require('./rootReducer').rootReducer;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

const store = configureStore();

export default store;
