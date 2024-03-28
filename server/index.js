import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { register, login, logout } from './controller/authController.js';
import { post, updatePost, deletePost, myPosts, searchPosts, allPosts } from './controller/postController.js';
import { forgotPassword, resetPassword } from './controller/recoverPasswordController.js';

dotenv.config();
const app=express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_URL);
    next();
});

app.use(cookieParser());

app.use(cors({
    origin: [process.env.REACT_APP_URL],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));

const PORT=process.env.REACT_APP_PORT;

const verifyUser=(req, res, next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({Error:'You are not logged in'});
    }
    jwt.verify(token, process.env.REACT_APP_JWT_KEY, (err, decoded)=>{
        if(err){
            return res.json({Error:'Invalid token'});
        }else{
            req.username=decoded.username;
            req.id=decoded.id;
            next();
        }
        
    })
}

app.get('/', verifyUser, (req, res)=>{
    return res.json({Status:'Success', username: req.username, id: req.id});
})

app.get('/posts', allPosts);

app.post('/posts/search', searchPosts);

app.get('/user/posts', verifyUser, myPosts);

app.get('/posts/userId', verifyUser, (req, res)=>{
    return res.json({id: req.id});
})

app.put('/posts', updatePost);

app.delete('/posts/:postId', deletePost);

app.post('/user/login', login);

app.post('/user/register', register);

app.post('/posts', post);

app.post('/user/forgot-password', forgotPassword);

app.post('/user/update-password', resetPassword);

app.get('/user/logout', logout);

app.listen(PORT,()=>{
    console.log('Running...');
})