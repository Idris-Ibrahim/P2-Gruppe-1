//Using Express and mysql2 packages
const express = require('express');
const app = express();
const mysql = require('mysql2');
//Port difined as a variable
const port = 3000;
//declaring this variable global:
var response;
//connection Objekt connets to database
const connection = mysql.createConnection({
    host: "10.92.0.104",
    user: "remote",
    password: "P2grupper#mote",
    database: "EventMan",    
});

connection.connect((err)=>{
    if (err) throw err;
    console.log('CONNECTED');
});


app.listen(port, ()=>{
    console.log(`port open at Localhost:${port}`);
});

app.get('/', (req, res)=>{
    res.send('main page');
});

connection.query('SELECT dato FROM kalender;', (err, res)=>{
    if (err) throw err;
    console.log(res);
    response = res;
});

app.get('/kalender', (req, res)=>{
    res.send(response);

});
