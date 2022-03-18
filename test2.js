//Using Express and mysql2 packages
const express = require('express');
const mysql = require('mysql');
//Port difined as a variable
const port = 3000;
//Defining an Objekt app that uses express
const app = express();
//pool objekt for pooling data from database
const {createPool} = require('mysql');

//connection Objekt connects to database:
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "p2gruppe1",
    database: "store",  
    connectionLimit: 10  
});