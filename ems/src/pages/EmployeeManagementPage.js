import React, { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';


const EmployeeManagementPage = () => {
    const [employees, setEmployees] = useState([]);
  
    useEffect(() => {
     
      fetchEmployees();
    }, []);
  
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/employees');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error.message);
      }
    };
  
    const handleFormSubmit = async (newEmployee) => {

        
      try {
        const response = await fetch('http://localhost:3000/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmployee),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        alert('Employee added successfully');
  
        // Fetch and update the list of employees after adding a new employee
        fetchEmployees();
      } catch (error) {
        console.error('Error adding employee:', error.message);
        alert('Error adding employee. Please try again.');
      }
    };
  
    return (
      <div>
        <h1>Employee Management Page</h1>
        <EmployeeForm onSubmit={handleFormSubmit} />
        
        <ul>
          {employees.map((employee) => (
            <li key={employee.employeeId}>{employee.employeeName}
            </li>
          ))}
        </ul>

      </div>
    );
  };
  
  export default EmployeeManagementPage;
