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
      console.log('hi');
      try {
        console.log('before');
        const response = await login(email,password);
        console.log('after')
        console.log('response',response)
        console.log(response.message);
        // const response = await axios.post('http://localhost:3001/api/login', {
        //   email,
        //   password,
        // });
        // console.log("adminstatus",response.data.user.isadmin)
        // const adminStatus=response.data.user.isadmin
        console.log("response from backend",response.data.message);
        if(response.message==='User logged')
        {
          toast.success("Login successful")
          setTimeout(()=>{
            navigate('/userform')
          },3000)
        }
        // else if(response.data.message==='Login successful.')
        // {
        //   toast.success(" Admin Login successful")
        //   setTimeout(()=>{
        //     navigate('/admin_training')
        //   },3000)
        // }

       
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
        <h1 className="h2">Login</h1>
        <form onSubmit={validationReg}>
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
