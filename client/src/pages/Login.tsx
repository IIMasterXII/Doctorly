import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PATIENT } from '../utils/mutations';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    age: '',
    gender: 'Male',
  });
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  const [addPatient, registerData] = useMutation(ADD_PATIENT);
  const [login, loginData] = useMutation(LOGIN_USER);

  const handleRegisterChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e: any) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const ageValue = parseInt(registerFormData.age, 10);
    if (isNaN(ageValue) || ageValue <= 0) {
      alert("Please enter a valid age.");
      return;
    }

    try {
      const { data } = await addPatient({
        variables: {
          input: {
            ...registerFormData,
            age: ageValue
          }
        }
      });

      Auth.login(data.addPatient.token);

      setRegisterFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "Male"
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { ...loginFormData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setLoginFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className='row justify-content-center mt-5'>
      <form className="col-4 card p-5 flex justify-content-between" onSubmit={handleLogin}>
        <div>
          <h2 className="mb-3">Login</h2>
          <div className="form-group">
            <label className="mb-1">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              value={loginFormData.username}
              onChange={handleLoginChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              className="form-control"
              value={loginFormData.password}
              onChange={handleLoginChange}
              required
            />
          </div>
        </div>

        <div>
        <hr />
        <button className="btn btn-primary w-100" type="submit" disabled={loginData.loading}>
          {loginData.loading ? "Logging in..." : "Login"}
        </button>

        {loginData.error && <p style={{ color: "red" }}>Error: {loginData.error.message}</p>}
        </div>
      </form>
      <div className='col-1'></div>
      <form className="col-4 card p-5 flex justify-content-between" onSubmit={handleRegister}>
        <div>
          <h2 className="mb-3">Register</h2>
          <div className="form-group">
            <label className="mb-1">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              value={registerFormData.username}
              onChange={handleRegisterChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              className="form-control"
              value={registerFormData.password}
              onChange={handleRegisterChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control"
              value={registerFormData.firstName}
              onChange={handleRegisterChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-control"
              value={registerFormData.lastName}
              onChange={handleRegisterChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">Age:</label>
            <input
              type="number"
              name="age"
              min="1"
              placeholder="18"
              className="form-control"
              value={registerFormData.age}
              onChange={handleRegisterChange}
              required
            />
          </div>

          <div className="form-group mt-2">
            <label className="mb-1">Gender:</label>
            <select className="form-control" name="gender" value={registerFormData.gender} onChange={handleRegisterChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
        <hr />
        <button className="btn btn-primary w-100" type="submit" disabled={registerData.loading}>
          {registerData.loading ? "Registering..." : "Register"}
        </button>

        {registerData.error && <p style={{ color: "red" }}>Error: {registerData.error.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
