import React, { useState } from 'react';
import './EmployeeForm.css';
import PropTypes from 'prop-types';


const EmployeeForm = ({ onSubmit }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('');
  const [dob, setdob] = useState('');
  const [isActive, setisActive] = useState(false);
  const [employmentType, setEmploymentType] = useState('');
  EmployeeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  


      
      return (
    <div class="employee-form-container">
      <h2>Add New Employee</h2>
      <form id="employeeForm" onSubmit={(event) => {
          event.preventDefault();

          const newEmployee = {
            employeeId,
            employeeName,
            department,
            dob,
            isActive,
            employmentType,
          };
            // Check if onSubmit is a function before calling it
    if (typeof onSubmit === 'function') {
        onSubmit(newEmployee);
      } else {
        console.error('onSubmit is not a function');
      }
  // Pass the new employee data to the parent component for submission

          // Optionally, you can reset the form fields after submission
          setEmployeeName('');
          setEmployeeId('');
          setDepartment('');
          setdob('');
          setisActive(false);
          setEmploymentType('');
        }}
      >
        <div>
          <label htmlFor="employeeName">Employee Name:</label>
          <input type="text" id="employeeName" name="employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
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
          <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setdob(e.target.value)} />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input type="checkbox" id="isActive" name="isActive" checked={isActive} onChange={(e) => setisActive(e.target.checked)} />
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
          <button id='submit-button' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
