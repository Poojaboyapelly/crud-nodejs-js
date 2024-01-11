/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { BrowserRouter as Router, Route,Link,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeForm from './components/EmployeeForm';
import Navbar from './components/Navbar';
import Header from './components/Header'

const App = () => {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/create" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
