import auth from "../utils/auth";
import { Link } from "react-router-dom";
import { MouseEvent } from "react";

const NavTabs = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    auth.logout();
  };
    return (
      <nav className="nav bg-primary nav-pills justify-content-end p-3">
        <Link to="/" className="btn text-light">
          Home
        </Link>
        <Link to="/analysis" className="btn text-light">
          Analysis
        </Link>
        <Link to="/appointments" className="btn text-light">
          Appointments
        </Link>
        <button className="nav-link text-light" onClick={logout}>
          Logout
        </button>
      </nav>
    );
  };
  
  export default NavTabs;