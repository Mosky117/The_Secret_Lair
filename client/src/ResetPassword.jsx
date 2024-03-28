import React,{useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function ResetPassword(){
    const {token}=useParams();
    const [values, setValues]=useState({
        newPassword:'',
        token: token
    })
    
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_URL}/user/update-password`, values)
        .then(res=>{
            if(res.data.Status==='Success'){
                navigate('/user/login');
            }else{
                alert('error')
            }
        })
        .then(err=>console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-white vh-100 mt-sm-5">
            <div className="bg-light p-3 rounded w-50">
                <h2 className="mb-4">Reset your password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="pasword"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter passowrd" name="password" className="form-control rounded-start" 
                        onChange={e=> setValues({...values, newPassword: e.target.value})} />
                        <small className="form-text text-muted">Your password must be 10 characters long, contain at least one number and one special character.</small>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-start mb-2">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;