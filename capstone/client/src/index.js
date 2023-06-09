import React from 'react';
// import './index.css'
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './components/State';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <UserProvider>
				<App />
			</UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


