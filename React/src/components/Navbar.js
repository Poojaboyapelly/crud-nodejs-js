// import React from 'react';
// import { Link ,useParams} from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//   //const { employeeId } = useParams();
//   return (
//     <nav>
//       <ul>
//      <li> <Link to="/">Dashboard</Link></li>
//      <li><Link to={`/employees`}>Create Employee</Link> </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // const location = useLocation();

  // // Show sign-in and sign-up links only on the landing page
  // if (location.pathname !== '/') {
  //   return null;
  // }

  return (
    <nav>
      <ul>
        <li>
          <Link to={`/employee/signin`}>Sign In</Link>
        </li>
        <li>
          <Link to={`/employee/signup`}>Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
