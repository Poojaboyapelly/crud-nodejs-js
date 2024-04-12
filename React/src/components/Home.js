import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import EmployeeForm from './EmployeeForm';
// import Navbar from './Navbar';
import Header from './Header';
import EditEmployee from './EditEmployee';
import Navbar from 'react-bootstrap/Navbar';

const Home = () => {

  return (
     <div>
      <Header />

      <Navbar/>
        
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/employees" element={<EmployeeForm  initialValues={{}}/>} />
        <Route
    path="/employees/:employeeId"
    element={
        <EditEmployee />
    }
/>
      </Routes>
      </div>
  );
};

export default Home;