import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  compose,
} from 'recompose';
import {
  contentSelector,
} from './state';

import logo from './logo.svg';
import './App.css';

const App = ({
  content,
}) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      {process.env.REACT_APP_SECRET_CODE} : { content }
    </p>
  </div>
);

const mapStateToProps = (state) => ({
  content: contentSelector(state),
});

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(App);
