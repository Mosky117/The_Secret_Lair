import db from "../db.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const salt=10;

const register=(req, res) => {
    const checkExistingUserSql = "SELECT COUNT(*) AS count FROM login WHERE username = $1 OR email = $2";
    if(!req.body.password || !req.body.username ||  !req.body.email){
        return res.json({Error:'No credentials found'});
    }
    db.query(checkExistingUserSql, [req.body.username, req.body.email], (checkErr, checkResult) => {
        if (checkErr) {
            return res.json({ Error: 'Database error' });
        }
        const userCount = checkResult.rows[0].count;
        if (userCount > 0) {
            return res.json({ Error: 'Duplicate' });
        } else {
            bcrypt.hash(req.body.password.toString(), salt, (hashErr, hash) => {
                if (hashErr) return res.json({ Error: 'Cannot hash the password' });
                const insertUserSql = "INSERT INTO login (username, email, password) VALUES($1, $2, $3)";
                const values = [
                    req.body.username,
                    req.body.email,
                    hash
                ];
                db.query(insertUserSql, values, (insertErr, insertResult) => {
                    if (insertErr) return res.json({ Error: 'Failed to register user' });
                    return res.json({ Status: 'Success' });
                });
            });
        }
    });
}


const login=(req, res)=>{
    const sql='SELECT * FROM login WHERE email = $1';
    db.query(sql, [req.body.email], (err, data)=>{
        const datas=data.rows;
        if(err) {
            return res.json({Error: 'Database error'});
        }
        if(datas.length > 0){
            bcrypt.compare(req.body.password.toString(), datas[0].password, (bcryptErr, result)=>{
                if(bcryptErr) {
                    return res.json({Error: 'Error in password comparison'});
                }
                if(result){ 
                    const username=datas[0].username;
                    const id=datas[0].id;
                    const token= jwt.sign({username, id},process.env.JWT_KEY,{expiresIn:'1d'});
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    }); 
                    return res.json({Status: 'Success'});
                } else {
                    return res.json({Error: 'Incorrect password'});
                }
            });
        } else {
            return res.json({Error: 'Incorrect email'});
        }
    });
}

const logout=(req, res)=>{
    res.clearCookie('token');
    return res.json({Status:'Success'});
}

export {login, logout, register};