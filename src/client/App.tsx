import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './assets/styles.css';
import HomePage from './collections/collectionsPage';
import NavBar from './navBar';
import * as React from 'react';
import LoginPage from './login/loginPage';
import SignupPage from './signup/signupPage';
import IndividualCollections from './collections/components/individualCollections';
import Review from './review/reviewPage';
import ReviewAll from './review/reviewAll';

const App: React.FC = () => {
  return (
    <div>
      {/* Alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
        {/* <button>Button</button> */}
        <Route path="/" element={
          <><NavBar /><HomePage /></>} />
          <Route path="/collections" element={<IndividualCollections />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} /> */}
          <Route path="/review" element={<Review />} />
          <Route path="/reviewAll" element={<ReviewAll />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;