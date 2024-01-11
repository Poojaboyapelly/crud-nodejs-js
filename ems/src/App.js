/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { BrowserRouter as Router, Route,Link,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
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
        <Route path="/create" element={<EmployeeManagementPage/>} />
        <Route path="/edit/:employeeId" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
