//Using Express and mysql2 packages
const express = require('express');
const app = express();
const mysql = require('mysql2');

//connection to backend server
const connection = mysql.createConnection({
    host: "10.92.0.104",
    user: "remote",
    password: "P2grupper#mote",
    database: "EventMan",    
});

connection.connect(function(err){
    if (err) throw err;
    console.log('CONNECTED');
});

//app listed on port defined earlier
/*app.listen(connection, function(){
    console.log(`port open at Localhost:${port}`);
});*/

//Bruger object til at sende query til Databasen
connection.query('SELECT * FROM customers;', (err, res)=>{
        console.log(res);    
    });