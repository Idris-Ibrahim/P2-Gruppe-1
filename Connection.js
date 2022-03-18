//Using Express and mysql2 packages
const express = require('express');
const app = express();
const mysql = require('mysql2');
//Port difined as a variable
const port = 3000;

//connection Objekt connects to database:
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "p2gruppe1",
    database: "store",  
    connectionLimit: 10  
});
//connection er skabt via objektet connection som tidligere defineret.
connection.connect(function(err){
    if (err) throw err;
    console.log('CONNECTED');
});

//app listed on port defined earlier
app.listen(port, function(){
    console.log(`port open at Localhost:${port}`);
});
//defining routes:
app.get('/', function(req, res){
    res.send('yo!');
});
//Bruger object til at sende query til Databasen
connection.query('SELECT * FROM customers;', (err, res)=>{
        console.log(res);    
    });

    app.get('/first_name', function(req, res){
        res.send('yo!');
    });
