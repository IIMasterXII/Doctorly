const NavTabs = () => {
    return (
      <nav className="nav nav-pills justify-content-center my-4">
        <a className="nav-link active" href="/home">
          Home
        </a>
        <a className="nav-link" href="/appointment">
          Appointment
        </a>
        <a className="nav-link" href="/patient">
          Patient
        </a>
        <a className="nav-link" href="/doctor">
          Doctor
        </a>
      </nav>
    );
  };
  
  export default NavTabs;