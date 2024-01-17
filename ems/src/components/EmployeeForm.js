import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

const EmployeeForm = () => {
    const [name, setName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [department, setDepartment] = useState('');
    const [dob, setDob] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [employmentType, setEmploymentType] = useState('');
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
        <div>
          <label htmlFor="name">Employee Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input type="text" id="employeeId" name="employeeId" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input type="checkbox" id="isActive" name="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="employmentType">Employment Type:</label>
          <select id="employmentType" name="employmentType" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
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
