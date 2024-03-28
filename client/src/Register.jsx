import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Register(){
    const [values, setValues]=useState({
        username:'',
        email:'',
        password:''
    });

    const navigate=useNavigate();

    function isPasswordValid(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{10,}$/;
        return passwordRegex.test(password);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!isPasswordValid(values.password)) {
            alert('Invalid password: at least 10 characters, a number and a special character');
            return;
        }
        axios.post(`https://the-secret-lair.vercel.app/user/register`,values)
        .then(res=>{
            if(res.data.Status==='Success'){
                navigate('/user/login');
            }else if(res.data.Error==='Duplicate'){
                alert('Username already taken');
            }else{
                alert('error');
            }
        })
        .then(err=>console.log(err));
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-white vh-100 mt-sm-5">
            <div className="bg-light p-3 rounded  w-30">
                <h2 className="mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username"><strong>Name</strong></label>
                    <input type="text" placeholder="Enter UserName" name="username"
                    onChange={e => setValues({ ...values, username: e.target.value })} className="form-control rounded-start" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder="Enter email" name="email"
                    onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded-start" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder="Enter password" name="password"
                    onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-start" />
                    <small className="form-text text-muted">Your password must be 10 characters long, contain at least one number and one special character.</small>
                </div>
                <button type="submit" className="btn btn-primary w-100 rounded-start">Sign Up</button>
                <p className="mt-3">Already have an account?</p>
                <Link to='/user/login' className="btn btn-default border w-100 bg-light rounded-start text-decoration-none">Log In</Link>
                </form>
            </div>
        </div>
    )
}

export default Register