import mysql from 'mysql2/promise.js';
import 'dotenv/config.js';

const conexao = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE 
});

export default conexao;