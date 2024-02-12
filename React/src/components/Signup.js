import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signUp } from '../api/authApi';
import './SignUp.css'

const SignUp = () => {

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
      const response= await signUp(values);
      if(response.created){
      navigate('/employee/signin');
      }
    } catch (error) {
    console.error(error);
      setFieldError('password', 'error signing up');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class='SignUp'>
      <h2>Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id='SignUp-form'>
            <div>
              <Field type="text" name="employeeId" placeholder="Employee ID" />
              <ErrorMessage name="employeeId" component="div" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
