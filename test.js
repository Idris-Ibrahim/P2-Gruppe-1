const {createPool} = require('mysql');
const mysql = require('mysql');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "p2gruppe1",
    database: "store",  
});
pool.query(`select * from customers`, (err, res)=>{
    return console.log(res);
 });
