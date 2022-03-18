//Using Express and mysql2 packages
const express = require('express');
const app = express();
const mysql = require('mysql2');
//Port difined as a variable
const port = 3000;
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