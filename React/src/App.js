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
import {RequireAuth} from './components/RequireAuth';
import { AuthProvider } from './components/Auth';


const App = () => {

  return (
    <AuthProvider>
    <Router>
     <Routes>
     <Route path="/employee/signin" element={<SignIn />} />
        <Route path="/employee/signup" element={<SignUp />} />
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/employees/:employeeId" element={<RequireAuth><EditEmployee /></RequireAuth>} />
        <Route path="/employee/Dashboard" element = {<RequireAuth><Dashboard/></RequireAuth>} />
        <Route path ='/Home'element={<RequireAuth><Home/></RequireAuth>}/>
        <Route path ='/CreateEmployee' element={<RequireAuth><EmployeeForm initialValues={{}}/></RequireAuth>}/>
        
        </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
