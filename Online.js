//Using Express and mysql2 packages
// const express = require('express');
// const app = express();
//^unused packages for this program

const mysql = require('mysql2');
//imports the mysql2 package from the library

//connection to backend server
const connection = mysql.createConnection({
    host: "10.92.0.104",
    user: "remote",
    password: "P2grupper#mote",
    database: "EventMan",
});
/*uses the function createConnection from the mysql2 package with the host user,
 password and database parameters to establish a connection to the database on the "connection" variable
*/

connection.connect(err=>{
    if (err) throw err;
    console.log('CONNECTED');
});
/* checking if the connection is established. If not an error is created and the program exits.
If successful, the program will log "Connected" to console */

//app listed on port defined earlier
/*app.listen(connection, function(){
    console.log(`port open at Localhost:${port}`);
});*/
//^unused code

//Bruger object til at sende query til Databasen
connection.query('SELECT * FROM kalender;', (err, res)=>{
        if (err) throw err;
        console.log(res);
    });
//uses the query function on the connection variable to send a query to the database
