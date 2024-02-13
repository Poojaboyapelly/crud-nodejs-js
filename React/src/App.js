//eslint-disable-next-line
import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import Dashboard from './components/Dashboard';
import EditEmployee from './components/EditEmployee';
import Home from './components/Home'
import EmployeeForm from './components/EmployeeForm';
import PrivateRoute from './components/PrivateRoute';


const App = () => {

  return (
    <Router>
     <Routes>
     <Route path="/employee/signin" element={<SignIn />} />
        <Route path="/employee/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/employees/:employeeId" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
        <Route path="/employee/Dashboard" element ={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path ='/Home'element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path ='/CreateEmployee' element={<PrivateRoute><EmployeeForm initialValues={{}}/></PrivateRoute>}/>
        </Routes>
    </Router>
  );
};

export default App;
