//Using Express and mysql2 packages
const express = require('express');
const app = express();
const mysql = require('mysql2');
//Port difined as a variable
const port = 3000;
//declaring this variables global:
var ALL;
let id;
let id_organisationer;
let event_name;
let event_type;
let beskrivelse;
let lokation;
let tid;
let dato;
let pris;
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
    console.log(`Port open at Localhost:${port}`);
});

app.get('/', (req, res)=>{
    res.send('main page');
});
/*
connection.query('SELECT * FROM kalender;', (err, res)=>{
    if (err) throw err;
    console.log(res);
    ALL = res;
});
*/
connection.query('SELECT id FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    id = res;
});

connection.query('SELECT id_organisationer FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    id_organisationer = res;
});

connection.query('SELECT event_name FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    event_name = res;
});

connection.query('SELECT event_type FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    event_type = res;
});

connection.query('SELECT beskrivelse FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    beskrivelse = res;
});

connection.query('SELECT lokation FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    lokation = res;
});

connection.query('SELECT tid FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    tid = res;
});

connection.query('SELECT dato FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    dato = res;
});

connection.query('SELECT pris FROM kalender WHERE id = 1;', (err, res)=>{
    if (err) throw err;
    //console.log(res);
    pris = res;
});

app.get('/kalender', (req, res)=>{
    res.send({id, id_organisationer, event_name, event_type, beskrivelse, lokation, tid, dato, pris});
    /*
    res.send(id_organisationer);
    res.send(event_name);
    res.send(event_type);
    res.send(beskrivelse);
    res.send(lokation);
    res.send(tid);
    res.send(dato);
    res.send(pris);
    */
});