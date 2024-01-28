/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { BrowserRouter as Router, Route,Link,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';
import Header from './components/Header';
import EditEmployee from './components/EditEmployee';

const App = () => {

  return (
    <Router>
      <Header />
      <Navbar />
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
    </Router>
  );
};

export default App;
