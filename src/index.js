import React from 'react';
 
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/index'
import './assets/styles/index.scss'
 
ReactDOM.render(
  <Provider store={store} > 
    <App />
  </Provider>
 ,  document.getElementById('root')
);

 