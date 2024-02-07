// EmployeeForm.js
import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css';
import './Formikstyles.css';

const EmployeeForm = ({ initialValues }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    
    initialValues: {
      employeeId: initialValues.employeeId || '',
      employeename: initialValues.employeename || '',
      department: initialValues.department || '',
      dob: initialValues.dob || '',
      isActive: initialValues.isActive || false,
      employmentType: initialValues.employmentType || '',
      role:initialValues.role || ''
    },
    
    validate: (values) => {
        const errors = {};
  
        // Validation for employeename (should not start with numbers)
        if (/^\d/.test(values.employeename)) {
          errors.employeename = 'Employee name should not start with numbers';
        }
  
        return errors;
      },
    onSubmit: async (values) => {
      try {
        if (initialValues.employeeId) {
          await updateEmployee(initialValues.employeeId, values);
        } else {
          await createEmployee(values);
        }

        alert('Employee updated successfully');
        formik.resetForm(); // Clear form fields
        navigate('/'); //redirect to a more appropriate page
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Error creating/updating employee:', error.response.data.error);
        } else {
          console.error('Error creating/updating employee:', error);
        }
      }
    },
   
  });

  const createEmployee = async (values) => {
    const response = await fetch('http://localhost:3000/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    alert('Employee added successfully');
    console.log('Employee created:', data);
  };

  const updateEmployee = async (employeeId, values) => {
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    console.log('Employee updated:', data);
  };

  return (
    <div className="employee-form-container">
      <h2>{initialValues.employeeId ? 'Edit Employee' : 'Add Employee'}</h2>
      <form id="employeeForm" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formik.values.employeeId}
            onChange={formik.handleChange}
            disabled={!!initialValues.employeeId} // Disable if editing
          />
        </div>

        <div>
          <label htmlFor="employeename">Employee Name:</label>
          <input
            type="text"
            id="employeename"
            name="employeename"
            value={formik.values.employeename}
            onChange={formik.handleChange}
          />
          {formik.errors.employeename && (
            <div className="error"  style={{ color: 'red', fontSize: '12px' }}>{formik.errors.employeename}</div>
          )}
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formik.values.dob}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formik.values.isActive}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <label htmlFor="employmentType">Employment Type:</label>
          <select
            id="employmentType"
            name="employmentType"
            value={formik.values.employmentType}
            onChange={formik.handleChange}
          >
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label>
          </label>
          <select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
          >
            <option value="Admin">Admin</option>
            <option value="SuperAdmin">SuperAdmin</option>
            <option value="Normal">Normal</option>
          </select>

        </div>
        <div className="form-field">
          <button id="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
