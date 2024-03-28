import React,{useState} from "react";
import axios from 'axios';

function ForgotPassword(){
    const [values, setValues]=useState({
        email:''
    });

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`https://the-secret-lair.vercel.app/user/forgot-password`, values)
        .then(res=>{
            if(res.data.Status==='Success'){
                alert('Check your mailbox to reset the password')
            }else{
                alert('Wrong email');
            }
        })
        .then(err=>console.log(err));
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-white vh-100 mt-sm-5">
            <div className="bg-light p-3 rounded w-50">
                <h2 className="mb-4">Recover your password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter email" name="email" className="form-control rounded-start" 
                        onChange={e=> setValues({...values, email:e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-start mb-2">Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;