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
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername]=useState('');


  const handleLogout=()=>{
    axios.get(`${process.env.REACT_APP_URL}/user/logout`)
    .then(res=>{
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
    }).catch(err=>{
        console.log(err);
    })
  }

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_URL}/`)
    .then(res=>{
        if(res.data.Status==='Success'){
            setUsername(res.data.username);
            setIsLoggedIn(true);
            
        }else{
            setIsLoggedIn(false);
        }
    })
    .then(err=>console.log(err));
  },[])

  return (
    <BrowserRouter>
    <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username}></Navbar>
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
