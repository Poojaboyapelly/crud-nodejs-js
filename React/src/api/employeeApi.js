

const url_b =process.env.BACKEND_API_URL;

export const getTable = async () => {
    try {
      const response = await fetch(url_b);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${await response.text()}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employee data:', error.message);
      throw error;
    }
  };
export const deleteEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${url_b}/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}  - ${await response.text()} for URL: ${response.url}`);
    }

    console.log('Employee deleted successfully');
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    throw error;
  }
};

export const getEmployee = async (employeeId) => {
    try {
      const response = await fetch(`${url_b}/${employeeId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw error; 
    }
  };
  
  export const updateEmployee = async (employeeId, updatedEmployeeData) => {
    const apiUrl = `${url_b}/${employeeId}`; 
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployeeData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Employee updated successfully!');
      return response.json(); 
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error; 
    }
  };

 export  const createEmployee = async (values) => {

    try{
    const response = await fetch('${apiUrl}/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
        
     if(!response.ok){
      console.log('Error adding employee');
    }
  
    const data = await response.json();
    alert('Employee added successfully');
    console.log('Employee created:', data);
  }
  catch(error){
    console.error('Error creating employee:', error);
  }
    
  };
