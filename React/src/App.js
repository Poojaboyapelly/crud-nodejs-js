//eslint-disable-next-line
import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Dashboard from './components/Dashboard';
import EditEmployee from './components/EditEmployee';
// import Home from './components/Home'


const App = () => {

  return (
    <Router>
     <Routes>
     <Route path="/employee/signin" element={<SignIn />} />
        <Route path="/employee/signup" element={<SignUp />} />
        <Route path="/employees/:employeeId" element={<EditEmployee />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path ='/Home'element={<Home/>}/> */}
        </Routes>
    </Router>
  );
};

export default App;
