import React, { useState, useEffect } from 'react';
import { getTable, deleteEmployee,getEmployee } from '../api/employeeApi'; 
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    showTable();
  }, []);

  const showTable = async () => {
    try {
      const employeesData = await getTable();
   
      setEmployees(employeesData);
      
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  const navigate = useNavigate();

  const handleEdit = async (employeeId) => {
    try {
     // Refetch employee data from API
      const employeeData = await getEmployee(employeeId);
      console.log('employeeData',employeeData);
      // Navigate to the edit form, passing the employee data
      navigate(`/employees/${employeeId}`, { state: employeeData });
    } catch (error) {
      console.error('Error fetching employee data:', error);
      alert('Error fetching employee data. Please try again.');
    }
  };


  const handleDelete = async (employeeId) => {
    try {
        await deleteEmployee(employeeId);

        // Refetch updated employee data from API
        await showTable(); // Call showTable to fetch fresh data
    
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
      
    }
  };

  return (
    
   
    <div>
      <h2>Employee list</h2>
      <table id = "employee-table"  className="employee-table table table-striped">
        <thead>
          <tr>
          <th scope="col">Employee ID</th>
          <th scope="col">Employee Name</th>
          <th scope="col">Department</th>
          <th scope="col">DOB</th>
          <th scope="col">Is Active</th>
          <th scope="col">Employment Type</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.employeename}</td>
              <td>{employee.department}</td>
              <td>{employee.dob}</td>
              <td>{employee.isActive ? 'Yes' : 'No'}</td>
              <td>{employee.employmentType}</td>
              <td>
                <button onClick={() => handleEdit(employee.employeeId)}>
                <i className="far fa-edit"></i> Edit
                </button>
                </td>
                <td>
                <button onClick={() => handleDelete(employee.employeeId)}>
                  <i className="far fa-trash-alt"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default Dashboard;

