import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Pool({
    user: process.env.REACT_APP_DB_USERNAME,
    host: process.env.REACT_APP_DB_HOST,
    database: process.env.REACT_APP_DB_DATABASE,
    password: process.env.REACT_APP_DB_PASSWORD,
    port: process.env.REACT_APP_DB_PORT, // Assicurati di avere la porta corretta per PostgreSQL
    ssl:true
});

db.connect((err)=>{
    if(err){
        console.log('connection error', err.stack);
    }else{
        console.log('connected');
    }
})

export default db;