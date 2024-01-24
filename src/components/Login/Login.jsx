
import React from 'react';
import './Login.css';

const Login = ({setToken,token,setRefreshtoken,refreshtoken,role,setRole,cwsname,cwscode,setCwsname,setCwscode}) => {

    const handleSignIn = async (e) => {
        e.preventDefault();
    
        // Get values from the input fields
        const emailOrPhone = document.getElementById('email_field').value;
        const password = document.getElementById('password_field').value;
    
        const formData = new FormData();
        formData.append('username', emailOrPhone);
        formData.append('password', password);
    
        try {
          const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            body: formData,
            redirect: 'follow',
          });
    
          if (response.ok) {
            const result = await response.json();
            
            console.log(result.access);
            console.log(result.refresh);
            console.log(result.cws_name);
            console.log(result.cws_code);
            console.log(result.role);
    
            // Set state or do other things with the data if needed
            setToken(result.access);
            setRefreshtoken(result.refresh);
            setCwscode(result.cws_code);
            setCwsname(result.cws_name);
            setRole(result.role);
    
            // Store in local storage
            localStorage.setItem("token", result.access);
            localStorage.setItem("refreshtoken", result.refresh);
            localStorage.setItem("cwscode", result.cws_code);
            localStorage.setItem("cwsname", result.cws_name);
            localStorage.setItem("role", result.role);
    
            console.log(response);
          } else {
            console.log('Login failed');
          }
        } catch (error) {
          console.log('Error during login:', error);
        }
    };
    

  return (
    <form className="form_container2 justify-center" onSubmit={handleSignIn}>
      <div className="logo_container">
      </div>
      <div className="title_container">
        <p className="title text-teal-600 font-bold text-2xl">Login</p>
      </div>
      <hr className='line'/>
      <br />
      <div className="input_container2">
        <label className="input_label2" htmlFor="email_field">
          Username
        </label>
        {/* Removed SVG section */}
        <input
          placeholder="username"
          title="Input title"
          name="input-name"
          type="text"
          className="input_field1"
          id="email_field"
        />
      </div>
      <div className="input_container2">
        <label className="input_label2" htmlFor="password_field">
          Password
        </label>
        {/* Removed SVG section */}
        <input
          placeholder="Password"
          title="Input title"
          name="input-name"
          type="password"
          className="input_field1"
          id="password_field"
        />
      </div>
      <button className='sign-in_btn'>Sign In</button>
     
    </form>
  );
};

export default Login;
