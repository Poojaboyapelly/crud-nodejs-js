
const apiUrl=process.env.apiUrl;
console.log(apiUrl);

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
      const responseData = await response.json();

      if (responseData.auth) {
          // If authentication is successful
          return responseData;
      } else {
          // If authentication failed
          throw new Error(responseData.error);
      }
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
  