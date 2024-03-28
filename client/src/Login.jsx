import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Login(){
    const [values, setValues]=useState({
        email:'',
        password:''
    });

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`https://the-secret-lair.vercel.app/user/login`,values)
        .then(res=>{
            console.log(res);
            if(res.data.Status==='Success'){
                localStorage.setItem('token', res.data.token);
                navigate('/');
            }else{
                alert('Error');
            }
        })
        .then(err=>console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-white vh-100 mt-sm-5">
            <div className="bg-light p-3 rounded w-50">
                <h2 className="mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter email" name="email" className="form-control rounded-start" 
                        onChange={e=> setValues({...values, email: e.target.value})} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter password" name="password" className="form-control rounded-start" 
                        onChange={e=> setValues({...values, password: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-start mb-2">Log In</button>
                    <Link to='/user/forgot-password' className="btn btn-default border w-100 bg-light mb-2 rounded-start text-decoration-none">Forgot password?</Link>
                    <Link to='/user/register' className="btn btn-default border w-100 bg-light rounded-start text-decoration-none">Create Account</Link>

                </form>
            </div>
        </div>
    )
}

export default Login