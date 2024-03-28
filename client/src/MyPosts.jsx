import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function MyPosts(){

    const [myPosts, setMyPosts]=useState([]);
    const [message, setMessage]=useState('');

    const [showEdit, setShowEdit]=useState(false);
    const [editPost, setEditPost]=useState({
      title:'',
      description:'',
      id:''
    })


    const [post, setValues]=useState({
        title:'',
        description:'',
        userId: ''
    });

    axios.defaults.withCredentials=true;

    useEffect(()=>{
        axios.get(`https://the-secret-lair.vercel.app/user/posts`)
        .then(res=>{
            if(res.data.Status==='Success'){
                setMyPosts(res.data.myPosts);
            }else{
                setMessage(res.data.Error);
            }
        })
        .then(err=>console.log(err));
    },[])

    const handlePost=(e)=>{
        e.preventDefault();
        axios.get('https://the-secret-lair.vercel.app/posts/userId')
        .then(res=>{
          setValues({...post, userId: res.data.id});
        })

        axios.post(`https://the-secret-lair.vercel.app/posts`, post)
        .then(res=>{
            if(res.data.Status==='Success'){
                window.location.reload();
            }else{
                alert('Error');
            }
        })
        .then(err=>console.log(err));
    }

    const handleShowEdit=(postId)=>{
      setShowEdit(true)
      setEditPost({...editPost, id: postId});
    }
    const handleHideEdit=()=>{
      setShowEdit(false);
    }
    const handleUpdate=(e)=>{
      e.preventDefault();
      axios.put(`https://the-secret-lair.vercel.app/posts`, editPost)
      .then(res=>{
        if(res.data.Status==='Success'){
          setShowEdit(false);
          window.location.reload();
        }else{
          alert('Error');
        }
      })
      .catch(err=>console.log(err));
    }

    const handleDelete=(postId)=>{
        axios.delete(`https://the-secret-lair.vercel.app/posts/${postId}`)
        .then(res=>{
            if(res.data.Status==='Success'){
                window.location.reload();
            }else{
                alert('Post already deleted, refresh the page');
            }
        })
        .then(err=>console.log(err));
    }

    return (
        <div className="container mt-4 ">
          <div className="bg-light card border p-3 rounded w-50 mx-auto">
            <h4>Write a post</h4>
            <form onSubmit={handlePost}>
              <div className="mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  value={post.title}
                  onChange={(e) => setValues({ ...post, title: e.target.value })}
                  className="form-control rounded-3"
                />
              </div>
  
              <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text-area"
                  placeholder="Enter description"
                  name="description"
                  value={post.description}
                  onChange={(e) => setValues({ ...post, description: e.target.value })}
                  className="form-control rounded-3"
                />
              </div>
  
              <button type="submit" className="btn btn-primary w-100">Publish</button>
            </form>
          </div>
        <div>
          {myPosts.map((post, index) => (
            <div key={index} className="card border bg-light rounded mt-3">
                <div className="card-body">
                    <h3 className="card-title">{post.title}</h3>
                    <hr />
                    <p className="card-text">{post.description}</p>
                    <button onClick={() => handleDelete(post.id)} className="float-end btn btn-danger">Delete</button>
                    <button onClick={() => handleShowEdit(post.id)} className="float-end btn btn-primary mx-3">Edit</button>
                </div>
            </div>
          ))}
        </div>

        {showEdit && (
            <div className="container"
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: '1000',
            }}>
              <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                  <div className="card shadow p-3 mb-5 bg-body rounded">
                    <div className="card-body">
                      <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label">Title</label>
                          <input
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            value={myPosts.title}
                            onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                            className="form-control rounded-3"
                          />
                        </div>

                        <div className="mb-3">
                          <label htmlFor="description" className="form-label">Description</label>
                          <textarea
                            placeholder="Enter description"
                            name="description"
                            value={myPosts.description}
                            onChange={(e) => setEditPost({ ...editPost, description: e.target.value })}
                            className="form-control rounded-3"
                          />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mb-3">Publish</button>
                        <button className="btn btn-danger w-100" onClick={handleHideEdit}>Cancel</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    )

}

export default MyPosts;