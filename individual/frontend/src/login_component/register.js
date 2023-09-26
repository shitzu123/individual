
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.scss';
import { ToastContainer, toast } from 'react-toastify';
import emailjs from 'emailjs-com';
import { signup } from '../services/signuploginservice';



function Signup() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  // const images = ['../register/food.webp', '../register/yoga.png','../register/sports.jpg','../register/bunty.jpg'];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval); // Clear the interval on unmount
  // }, []);
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  const validationReg = async (e) => {
    e.preventDefault()
    const data = {
      name: name,
      email: email,
      password: password,
    };
    console.log("registration data",data)
    
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      toast.error('Please fill in all fields.');
    }
    else if (!passwordRegex.test(password)) {
      toast.error("Password must contain at least 1 capital letter, 1 special character, and be at least 8 characters long.");
      formRef.current.reset()
    }
    else if (password !== repassword) {
      toast.error("Password doesn't match")
      formRef.current.reset()
    }

    else {
      try {
        const response = await signup(data);
        console.log('response',response)
        console.log(response.message);
        
        // const response = await axios.post('http://localhost:3000/users/signup', data);
        // console.log(response.data.message)
        if (response.message === "response success") {
          toast.success("User created successfully")
          // emailjs.sendForm('service_203o8iw', 'template_qnoprc4', formRef.current, '9rndwk3q5_ec5AzuH').then(
          //       (result) => {
          //           console.log(result.text);
          //       },
          //       (error) => {
          //           console.log(error.text);
          //       }
          //   );
          setTimeout(() => {
            navigate('/')
          }, 3000)
        }
        else if (response.data.message === "user already exists") {
          toast.error("user already  exists")
          formRef.current.reset()
        }
        else if (response.data.message === "Failed to register user.") {
          toast.error("Failed to register")
          formRef.current.reset()
        }
      } catch (error) {
        console.log("error i got backend", error);
        toast.error("Failed in register in server")
        formRef.current.reset()
      }
    }
  };



  return (
    <div className="signup-container ">
       <div className="login-left">
        <ToastContainer />
        <img src="../register/sports.jpg" alt="Login" />
      </div>
      <div className="signup-right">
        <form className="signupForm" ref={formRef}>
          <ToastContainer />
          <h1>Signup</h1>
          <div className="input-container">
            <i className="fa-regular fa-user"></i>
            <input name="user_name" type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          </div>
          <div className="input-container">
            <i className="fa-regular fa-envelope"></i>
            <input name="user_email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-lock"></i>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div className="input-container">
            <i className="fa-solid fa-lock"></i>
            <input type="password" onChange={(e) => setRepassword(e.target.value)} placeholder="Confirm Password" required />
          </div>
          <div>
            <Link to="/">
              <button className="olduserbutton" type="submit">
                Login
              </button>
            </Link>
            <button type='submit' className="signupbutton" onClick={validationReg}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}



export default Signup;