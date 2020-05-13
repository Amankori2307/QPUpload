import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext from './Context/AuthContext';

ReactDOM.render(
  <AuthContext>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContext>,
  document.getElementById('root')
);
