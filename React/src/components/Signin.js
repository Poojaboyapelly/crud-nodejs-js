import React, { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../api/authApi';
import './SignIn.css'
import {useAuth} from './Auth';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
 const location =useLocation();
 const navigate = useNavigate();
 const auth1 =useAuth();
 const redirectPath =location.state?.path || '/Home'

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

    
    console.log(values);
     const {auth,session}= await signIn(values);
     console.log("session:",session);
     console.log("auth:",auth);

     
     
     if(auth){
        
            localStorage.setItem("key", session.token);
            localStorage.setItem("employeeId",session.employeeId);
            auth1.login(true);
            navigate(redirectPath ,{replace:true});
     
     }
     else{
        setFieldError('password','Invalid credentials')
     }
   
    } catch (error) {
      console.error(error);
      setFieldError('password', 'Try again later');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='Signin'>
       <div className="container">
      <h2 class='mb-4'>Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form id="Signin-form" >
            <div className='mb-3'>
              <Field className="form-control" type="text" name="employeeId" placeholder="Employee ID" />
              <ErrorMessage name="employeeId" component="div" className="invalid-feedback"/>
            </div>
            <div className='mb-3'>
              <Field className="form-control" type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="invalid-feedback"/>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sign In</button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
};

export default SignIn;
