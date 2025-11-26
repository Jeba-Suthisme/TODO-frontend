import React from 'react'
import style from './signup.module.css'
import axios from 'axios'
import { useState } from 'react';

import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  // SIGNUP BUTTON

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !phone_number) {
      setError("All fields are required for signup");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/createuser/", {
        name,
        phone_number,
        email,
      });

      sendEmailOTP();

      alert("Signup + OTP Sent Successfully!");
      navigate("/todo");

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Signup failed");
      }
    }
  };

 
  // SEND OTP EMAIL
 
  const sendEmailOTP = async () => {
    await axios.post("http://127.0.0.1:8000/api/contact/", {
      name,
      phone_number,
      email,
    });
  };

  return (
    <div className={style.App}>
     <div>
      <h1 >SIGN UP</h1>
       <input type='text' placeholder='enter your name ' value={name} onChange={(e)=>setname(e.target.value)}/>
       <input type='text' placeholder='enter your phone number ' maxLength={10} value={phone_number} onChange={(e)=>setphone_number(e.target.value)}/>

       <input type='text' placeholder='enter your email' value={email} onChange={(e)=>setemail(e.target.value)}/>
        {error && <p style={{ color: "red" }}>{error}</p>}
       
      <button onClick={handleSignup}>SIGN UP</button>
      </div> 
       
       
    </div>
  );
}

export default Signup