import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../api/authApi';
import './SignIn.css'

const SignIn = () => {
 const navigate = useNavigate();

  const initialValues = {
    employeeId: '',
    password: ''
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee ID is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {

     const response= await signIn(values);
     console.log(response);
     if(response.auth){
     navigate('/')
     }
     else{
        setFieldError('password','Invalid credentials')
     }
   
    } catch (error) {
      console.error('Error signing in');
      setFieldError('password', 'Try again later');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class='Signin'>
      <h2>Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id="Signin-form" >
            <div>
              <Field type="text" name="employeeId" placeholder="Employee ID" />
              <ErrorMessage name="employeeId" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
