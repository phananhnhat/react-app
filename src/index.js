import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';

import configureStore from './configureStore'

const store = configureStore({
  users: {},
  posts: {},
});

// React 17
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// React 18
// Phải dùng createRoot thì mới có cơ chế concurrent + batch update trong react
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <Provider store={store}>
    <App />
  </Provider>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
