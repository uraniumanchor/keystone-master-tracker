import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { getQueries } from './store';
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <App />
      </ReduxQueryProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

