import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/Header';
import BaseRouter from './routes';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <BaseRouter />
        {/* <CollectionList /> */}
        <div className="footer">Footer</div>
      </Router>
    </div>
  );
}

export default App;
