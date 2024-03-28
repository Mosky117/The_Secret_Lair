import db from "../db.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

dotenv.config();

const forgotPassword = (req, res) => {
    const email = req.body.email; 

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.REACT_APP_EMAIL,
            pass: process.env.REACT_APP_EMAIL_PASSWORD
        }
    });

    const checkEmailQuery = 'SELECT * FROM login WHERE email = $1';
    db.query(checkEmailQuery, [email], (err, data) => {
        const datas=data.rows
        if (err) {
            console.log('1');
            return res.json({ Error: 'Database error' });
        }
        if (datas.length === 0) {
            console.log('2');
            return res.json({ EError: 'No user found with this email' });
        }

        const recoveryToken = jwt.sign({ email }, process.env.REACT_APP_JWT_KEY, { expiresIn: '1h' });

        const resetLink=`https://the-secret-lair-v7oi-eight.vercel.app/user/reset-password/${recoveryToken}`;

        const mailOptions={
            from: process.env.REACT_APP_EMAIL,
            to: email, 
            subject: 'Password recovery', 
            text: `Click on the following link to recover your password: ${resetLink}`
        
        }

        transporter.sendMail(mailOptions, (sendMailErr, info) => {
            if (sendMailErr) {
                console.log('3');
                return res.json({ Error: 'Error while sending the reset link' });
            }
            return res.json({ Status: 'Success' });
        });
    });
}

const resetPassword = (req, res) => {
    const token = req.body.token;
    const newPassword = req.body.newPassword;

    jwt.verify(token, process.env.REACT_APP_JWT_KEY, (err, decoded) => {
        if (err) {
            return res.json({ Error: 'Invalid or expired token' });
        }
        const email = decoded.email;

        bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                return res.json({ Error: 'Error while hashing password' });
            }

            const updatePasswordQuery = 'UPDATE login SET password = $1 WHERE email = $2';
            db.query(updatePasswordQuery, [hashedPassword, email], (updateErr, updateResult) => {
                if (updateErr) {
                    return res.json({ Error: 'Error while updating password' });
                }

                return res.json({ Status: 'Success' });
            });
        });
    });
}

export { forgotPassword, resetPassword };