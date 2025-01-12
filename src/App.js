import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <div id="wrap">
          <div className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">🍺</a>
              </div>
            </div>
          </div>
          <main id="content" role="main" className="container">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              
            </Routes>
          </main>
        </div>
        <div className="container">
          <p>Brewblog &copy; All Rights Reserved.</p>
        </div>
      </div>
    </Router>
  );
}

export default App;