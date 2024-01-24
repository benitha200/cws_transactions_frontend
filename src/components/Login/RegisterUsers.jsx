import React, { useState } from 'react';
import './RegisterPage.css';


const RegisterUsers = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [cwsName, setCwsName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log({
      firstName,
      lastName,
      email,
      phone,
      role,
      cwsName,
      password,
      confirmPassword,
    });
  };

  return (
    <form className="form_container wider_card" onSubmit={handleRegister}>
      {/* <div className="logo_container"></div> */}
      <div className="title_container">
        <p className="title">Register an Account</p>
      </div>
      <br />
      <div className="input_container3">
        <label className="input_label" htmlFor="first_name_field">
          First Name
        </label>
        <input
          placeholder="John"
          type="text"
          className="input_field3"
          id="first_name_field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="last_name_field">
          Last Name
        </label>
        <input
          placeholder="Doe"
          type="text"
          className="input_field3"
          id="last_name_field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="email_field">
          Email
        </label>
        <input
          placeholder="name@mail.com"
          type="text"
          className="input_field3"
          id="email_field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="phone_field">
          Phone
        </label>
        <input
          placeholder="123-456-7890"
          type="text"
          className="input_field3"
          id="phone_field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="role_field">
          Role
        </label>
        <select
          className="input_field3"
          id="role_field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="cws_manager">CWS Manager</option>
          <option value="super_user">Super User</option>
          <option value="administrator">Administrator</option>
        </select>
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="cws_name_field">
          CWS Name
        </label>
        <input
          placeholder="CWS Name"
          type="text"
          className="input_field3"
          id="cws_name_field"
          value={cwsName}
          onChange={(e) => setCwsName(e.target.value)}
        />
      </div>

      <div className="input_container3">
        <label className="input_label" htmlFor="password_field">
          Password
        </label>
        <input
          placeholder="Password"
          type="password"
          className="input_field3"
          id="password_field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input_container">
        <label className="input_label" htmlFor="confirm_password_field">
          Confirm Password
        </label>
        <input
          placeholder="Confirm Password"
          type="password"
          className="input_field3"
          id="confirm_password_field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className='bg-teal-600 p-3 rounded text-gray-200 w-5'>Register</button>

      {/* <button title="Register" type="submit" className="register_btn">
        <span>Register</span>
      </button> */}
    </form>
  );
};

export default RegisterUsers;