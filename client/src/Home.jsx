import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

function Home(){
    const [posts, setPosts]=useState([]);
    const [search, setSearch]=useState({
        value:''
    });

    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/posts`)
        .then(res=>{
            if(res.data.Status==='Success'){
                setPosts(res.data.posts);
            }
        })
        .then(err=>console.log(err));
    },[])
    
    const handleSearch=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_URL}/posts/search`, search)
        .then(res=>{
            if(res.data.Status==='Success'){
                setPosts(res.data.posts);
            }
        })
        .then(err=>console.log(err));
    }

    const navigate=useNavigate();

    return (
        <div className="container mt-4">
        <div className="bg-white p-3 rounded">
          <form onSubmit={handleSearch}>
            <div className="mb-3 d-flex">
              <input type="text" placeholder="Search for a post" name="search" onChange={(e) => setSearch({ value: e.target.value })} className="rounded-start" />
              <button type="submit" className="btn btn-primary rounded-end">Publish</button>
            </div>
          </form>
        </div>
  
        <div className="mt-4">
          {posts.map((post, index) => (
            <div key={index} className="card border bg-light rounded mt-5">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <hr />
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
}

export default Home