import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { getEmployee } from '../api/employeeApi';

const prevEmployee = (data) => {
    return {
      name: data.name ,
      department: data.department ,
      dob: data.dob ,
      isActive: data.isActive ,
      employmentType: data.employmentType
    };
  };

const EditEmployee = () => {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState({
    prevEmployee
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const prevEmployee = await getEmployee(employeeId);
        setEmployeeData(prevEmployee);
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Error fetching employee data. Please try again.');
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const apiUrl = 'http://localhost:3000/employees'; 

  const handleFormSubmit = async (updatedEmployee) => {
    try {
      
      await fetch(`${apiUrl}/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });

      alert('Employee updated successfully!');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };

  return (
    <EmployeeForm
      initialValues={employeeData}
      onSubmit={handleFormSubmit}
    />
  );
};

export default EditEmployee;
