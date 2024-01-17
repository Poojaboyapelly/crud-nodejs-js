import React from 'react';
import { Link ,useParams} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { employeeId } = useParams();
  return (
    <nav>
      <ul>
     <li> <Link to="/">Dashboard</Link></li>
     <li><Link to={`/employees`}>Create Employee</Link> </li>
      </ul>
    </nav>
  );
};

export default Navbar;
