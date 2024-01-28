import React, { useState ,useParams} from 'react';
import {  useNavigate } from 'react-router-dom';
import './EmployeeForm.css';


const EmployeeForm = ({ initialValues }) => {
    const [employeename, setEmployeeName] = useState(initialValues.employeename ? initialValues.employeename: '');
    const [employeeId, setEmployeeId] = useState(initialValues.employeeId ? initialValues.employeeId : '');
    const [department, setDepartment] = useState(initialValues.department ? initialValues.department : '');
    const [dob, setDob] = useState(initialValues.dob ? initialValues.dob : '' );
    const [isActive, setIsActive] = useState(initialValues.isActive || false);
    const [employmentType, setEmploymentType] = useState(initialValues.employmentType||'' ); 
  

  
    const navigate = useNavigate();
    
  
    // const handleSubmit = async (event) => {
    
    //     event.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3000/employees', {
    //           method: 'POST',
    //           headers: { 'Content-Type': 'application/json' },
    //           body: JSON.stringify({
    //             employeename,
    //             employeeId,
    //             department,
    //             dob,
    //             isActive,
    //             employmentType,
    //           }),
    //         });
      
    //         const data = await response.json();
    //         console.log('Employee created:', data);
    //         // Handle success (e.g., display a success message, clear form fields)
    //       } catch (error) {
    //         console.error('Error creating employee:', error);
    //         // Handle error (e.g., display an error message)
    //       }
        
         
    
    //     // Optionally, clear the form fields after submission
    //     setEmployeeName('');
    //     setEmployeeId('');
    //     setDepartment('');
    //     setDob('');
    //     setIsActive(false);
    //     setEmploymentType('');

    //     navigate('/');
    //   };


    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        if (initialValues.employeeId) {
          await updateEmployee(initialValues.employeeId);
        } else {
          await createEmployee();
        }
           
      alert('Employee updated successfully');

        // Handle success (e.g., display a success message, clear form fields)
        setEmployeeName('');
        setEmployeeId('');
        setDepartment('');
        setDob('');
        setIsActive(false);
        setEmploymentType('');
        navigate('/'); // Or redirect to a more appropriate page
    
      } catch (error) {
        if (error.response && error.response.data) {
          
          console.error('Error creating/updating employee:', error.response.data.error);
          
        } else {
        
          console.error('Error creating/updating employee:', error);
          
        }
      }
    };
    
    const createEmployee = async () => {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId,
          employeename,
          department,
          dob,
          isActive,
          employmentType,
        }),
      });
    
      const data = await response.json();
      alert('Employee added successfully');
      
      console.log('Employee created:', data);
    };
    
    const updateEmployee = async (employeeId) => {
      const response = await fetch(`http://localhost:3000/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeename: employeename || initialValues.employeename,
          department: department || initialValues.department,
          dob: dob || initialValues.dob ,
          isActive: isActive || initialValues.isActive,
          employmentType:employmentType || initialValues.employmentType
        }),
      });
    
      const data = await response.json();
      console.log('Employee updated:', data);
    };
    
  
    
      return (
    <div class="employee-form-container">
    
      <h2>{  'Add/ Edit Employee'}</h2>
      <form id="employeeForm" onSubmit={handleSubmit}>
      
     
        <div>
          <label htmlFor="employeeId">Employee ID:</label>
          <input type="text" id="employeeId" name="employeeId" defaultValue={initialValues.employeeId || ''}  onChange={(e) => setEmployeeId(e.target.value)} />
        </div>
        
        
         <div>
          <label htmlFor="employeename">Employee Name:</label>
          <input type="text" id="employeename" name="employeename" defaultValue={initialValues.employeename || ''} onChange={(e) => setEmployeeName(e.target.value)  } />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input type="text" id="department" name="department" defaultValue={initialValues.department || ''} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label htmlFor="dob">DOB:</label>
          <input type="date" id="dob" name="dob" value={dob}onChange={(e) => setDob(e.target.value)} />
          
        </div>
        <div>
          <label htmlFor="isActive">Is Active:</label>
          <input type="checkbox" id="isActive" name="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
        </div>
        <div>
          <label htmlFor="employmentType">Employment Type:</label>
          <select id="employmentType" name="employmentType" defaultValue={initialValues.employmentType || ''} onChange={(e) => setEmploymentType(e.target.value)}>
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