import { createEmployee } from "./employeeApi";
const apiUrl = 'http://localhost:3000/api/employees'; 

export const signIn = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/employee/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error('Sign in failed: ' + error.message);
    }
  };
  
  export const signUp = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/employee/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const newEmployee= await response.json();
      console.log(newEmployee);
      //await createEmployee(newEmployee);
      return newEmployee;
    } catch (error) {
      throw new Error('Sign up failed: ' + error.message);
    }
  };
  