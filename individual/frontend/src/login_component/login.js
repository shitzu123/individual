import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';
import { ToastContainer, toast } from 'react-toastify';
import { login } from '../services/signuploginservice';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validationReg = async (e) => {
    e.preventDefault();

    if (email.trim() !== '' && password.trim() !== '') {

      try {
        const response = await login(email,password);
        console.log(response)
        if(response.message==='User logged' && response.role ==='user')
        {
          toast.success("Login successful")
          setTimeout(()=>{
            navigate('/user_page')
          },2000)
        }else if(response.message==='User logged' && response.role ==='admin')
        {
          toast.success("Login successful")
          setTimeout(()=>{
            navigate('/view_event')
          },2000)
        }
       
      } catch (error) {
        console.error('Sign-in error:', error);
        toast.error("Login failed")
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <ToastContainer />
        <img src="../login/music.jpg" alt="Login" />
      </div>
      <div className="login-right">
        <h1 className="h1">Login</h1>
        <form className="loginForm" onSubmit={validationReg}>
          <div className="login-input-container">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="login-input-container">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          
          <div className="buttons">
            <Link to="/signup">
              <button className="oldloginbutton">Register</button>
            </Link>
            <button className="loginbutton" type="submit" onClick={validationReg}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
