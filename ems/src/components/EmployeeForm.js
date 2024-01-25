import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

const EmployeeForm = ({ initialValues, onSubmit }) => {
    const [name, setName] = useState(initialValues.name ? initialValues.name : '');
    const [employeeId, setEmployeeId] = useState(initialValues.employeeId ? initialValues.employeeId : '');
    const [department, setDepartment] = useState(initialValues.department ? initialValues.department : '');
    const [dob, setDob] = useState(initialValues.dob ? initialValues.dob : '' );
    const [isActive, setIsActive] = useState(initialValues.isActive ? initialValues.isActive : false);
    const [employmentType, setEmploymentType] = useState(initialValues.employmentType);   
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
    
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/employees', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name,
                employeeId,
                department,
                dob,
                isActive,
                employmentType,
              }),
            });
      
            const data = await response.json();
            console.log('Employee created:', data);
            // Handle success (e.g., display a success message, clear form fields)
          } catch (error) {
            console.error('Error creating employee:', error);
            // Handle error (e.g., display an error message)
          }
        
         
    
        // Optionally, clear the form fields after submission
        setName('');
        setEmployeeId('');
        setDepartment('');
        setDob('');
        setIsActive(false);
        setEmploymentType('');

        navigate('/');
      };
  
    
      return (
    <div class="employee-form-container">
      <h2>Add New Employee</h2>
      <form id="employeeForm" onSubmit={handleSubmit}>
      {initialValues.name && (
        <div>
          <label htmlFor="name">Employee Name:</label>
          <input type="text" id="name" name="name" value={initialValues.name || ''} autocomplete='name' onChange={(e) => setName(e.target.value)  } />
        </div>
      )}
      {initialValues.employeeId &&(
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input type="text" id="employeeId" name="employeeId" value={initialValues.employeeId || ''} autocomplete='employeeId' onChange={(e) => setEmployeeId(e.target.value)} />
        </div>
        )}
        <div>
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" value={initialValues.department || ''} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input type="date" id="dob" name="dob" value={initialValues.dob || ''} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input type="checkbox" id="isActive" name="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="employmentType">Employment Type:</label>
          <select id="employmentType" name="employmentType" value={initialValues.employmentType || ''} onChange={(e) => setEmploymentType(e.target.value)}>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div className='form-field'>
          <button id='submit-button' type="submit"  >Submit</button>
        </div>
      </form>
    </div>
  );
};

  

export default EmployeeForm;
