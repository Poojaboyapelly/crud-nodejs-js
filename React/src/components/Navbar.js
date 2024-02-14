import React from 'react';
import { Link ,useParams,useNavigate} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const { employeeId } = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
       const employeeId = localStorage.getItem('employeeId'); 
      // const sessionrecord = await findOne
      const response = await fetch('http://localhost:3000/api/employees/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeeId })
      });
      const responseData = await response.json();
if (response.ok) {
  if (responseData.message === "Logout successful") {
    localStorage.removeItem("key");
    localStorage.removeItem("employeeId");
    navigate('/employee/signin');
  } else {
    console.error('Logout failed:', responseData.message);
  }
} else {
  console.error('Logout failed:', response.statusText);
}

    } catch (error) {
      console.error('Logout error:', error);
     
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/employee/signin`}>Sign In</Link>
        </li>
        <li>
          <Link to={`/employee/signup`}>Sign Up</Link>
        </li>
        <li> 
          <Link to="/employee/Dashboard">Dashboard</Link>
          </li>
         <li>
           <Link to={`/CreateEmployee`}>Create Employee</Link> 
        </li>
        <li><button  className="logout-button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
