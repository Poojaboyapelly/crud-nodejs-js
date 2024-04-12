// LandingPage.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';
import { Link,useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';



// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//        <div className="container-fluid">
//         <Link className="navbar-brand" to="/employee/Dashboard">Dashboard</Link> 

//           <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
//             <li className="nav-item"> 
//               <Link className="navbar-brand" to={`/employee/signin`}>Sign In</Link> 
//             </li>
//             <li className="nav-item"> 
//               <Link className="navbar-brand" to={`/employee/signup`}>Sign Up</Link>
//             </li>
//             <li className="nav-item"> 
//               <Link className="navbar-brand" to={`/CreateEmployee`}>Create Employee</Link> 
//             </li>
//           </ul>
//           <Button className="btn btn-outline" onClick={handleLogout}>Logout</Button>
//         </div>
//     </nav>
const LandingPage = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/employee/signin');
  };
  const handleSignUp = () => {
    navigate('/employee/signup');
  };

  return (
    // <div>
      
      
    //   <div className="landing-content">
    //     <h1  class="text-body-secondary">Employee Management System</h1>
    //     <Navbar />
    //     <p>Please sign in or sign up </p>
    //     <div className="landing-links">
    //       <Link to="/employee/signin">
    //         <FontAwesomeIcon icon={faSignInAlt} onClick={handleSignIn} />
    //       </Link>
    //       <Link to="/employee/signup">
    //         <FontAwesomeIcon icon={faUserPlus} onClick={handleSignUp}  />
    //       </Link>
    //     </div>
        
       
    //   </div>
      
    // </div>
    <div>
    <div className="landing-content">
      <h1 class="d-block p-2 text-bg-dark">Employee Management System</h1>
      <Navbar />
      <p class="h5">Please sign in or sign up</p>
      <div className="row">
        <div className="col-md-6" onClick={handleSignIn}>
          <div className="icon-container d-flex justify-content-center align-items-center" >
            <FontAwesomeIcon icon={faSignInAlt}  size="3x" border/>
            <span>Sign In</span>
          </div>
        </div>
        <div className="col-md-6" onClick={handleSignUp}>
          <div className="icon-container d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faUserPlus}  size="3x"  border/>
            <span>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LandingPage;


