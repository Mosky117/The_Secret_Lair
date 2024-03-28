import React from "react";
import { Link } from "react-router-dom";
import useUserSession from "./useUserSession";

function Navbar(){
  const {token, logout}=useUserSession();
  console.log(token);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to='/' className="nav-link text-primary">Home</Link>
        </li>
        {token ? (
          <React.Fragment>
            <li className="nav-item">
              <Link to='/user/posts' className="nav-link text-primary">Posts of ME</Link>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="btn btn-outline-danger rounded-pill">Logout</button>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <Link to='/user/register' className="nav-link text-primary">Register</Link>
            </li>
            <li className="nav-item">
              <Link to='/user/login' className="nav-link text-primary">Login</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </div>
  </nav>
  );
}

export default Navbar