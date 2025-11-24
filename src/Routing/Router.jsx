import React from 'react'
import Main from '../mainpage/Main'
import Login from '../loginpage/Login'
import Signup from '../signuppage/Signup'
import { Routes,Route } from 'react-router-dom'




const Router = () => {
  return (
  <>
 
  <Routes>
    <Route path ='/' element={<Login/>}/>
     <Route path ='/todo' element={<Main/>}/>
     <Route path='/signup' element={<Signup/>}/>
  </Routes>
  </>
  )
}

export default Router