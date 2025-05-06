import auth from "../utils/auth";
import { MouseEvent } from "react";

const NavTabs = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    auth.logout();
  };
    return (
      <nav className="nav bg-primary nav-pills justify-content-end p-3">
        <a className="nav-link text-light" href="/">
          Home
        </a>
        <a className="nav-link text-light" href="/analysis">
          Analysis
        </a>
        <a className="nav-link text-light" href="/appointments">
          Appointments
        </a>
        <button className="nav-link text-light" onClick={logout}>
          Logout
        </button>
      </nav>
    );
  };
  
  export default NavTabs;