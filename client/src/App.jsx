import React,{useState,useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPosts from './MyPosts';
import Navbar from './Navbar';

function App() {
  
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/user/register' element={<Register/>}></Route>
        <Route path='/user/login' element={<Login/>}></Route>
        <Route path='/user/posts' element={<MyPosts/>}></Route>
        <Route path='/user/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/user/reset-password/:token' element={<ResetPassword/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
