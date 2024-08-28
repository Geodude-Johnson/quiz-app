import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './assets/styles.css';
import HomePage from './home/homePage';
import NavBar from './navBar';
import * as React from 'react';

const App: React.FC = () => {
  return (
    <div>
      {/* Alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
        {/* <button>Button</button> */}
        <Route path="/" element={
          <><NavBar /><HomePage /></>} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;