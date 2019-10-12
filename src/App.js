import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import BaseRouter from './routes';
import { AuthProvider } from './context';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Router>
          <Header />
          <BaseRouter />
          <div className="footer">Footer</div>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
