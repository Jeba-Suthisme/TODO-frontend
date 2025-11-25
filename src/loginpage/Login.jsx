import React from 'react'
import style from './login.module.css'
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const Login = () => {
  // const [name, setname] = useState("");
  // const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // LOGIN BUTTON
  
  const handleLogin = async () => {
    setError("");

    if (!phone_number) {
      setError("Phone number is required");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/login/", {
        phone_number,
      });
     

      alert("Login Successful!");
      navigate("/todo");

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed");
      }
    }
  };



 



  return (
    <div className={style.App}>
      <div>
        <h1 >LOGIN</h1>
        {/* <input type='text' placeholder='enter your name ' value={name} onChange={(e) => setname(e.target.value)} /> */}
        <input type='text' placeholder='enter your phone number ' value={phone_number} onChange={(e) => setphone_number(e.target.value)} />

        {/* <input type='text' placeholder='enter your email' value={email} onChange={(e) => setemail(e.target.value)} /> */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>LOGIN</button>
        <p>
          Don't have an account?
          <Link to="/signup"> Sign up </Link>
        </p>

      </div>


    </div>
  );
}

export default Login