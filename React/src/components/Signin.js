import React, { useState } from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../api/authApi';
import './SignIn.css'
import {useAuth} from './Auth';

const SignIn = () => {
 const location =useLocation();
 const [user,setUser] =useState(false);
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
           
            auth1.login(true);
        
            // const redirectTo = new URLSearchParams(window.location.search).get('redirect');
            navigate(redirectPath ,{replace:true}); 
          
    // localStorage.setItem("key", session.token);

    //  navigate('/Home');
     
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
