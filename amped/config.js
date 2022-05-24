const Sequelize = require("sequelize");
//Op operator functionality
const {Datatypes, Op} = Sequelize;

//connectio til vores database, EventMan er navnet på databasen, remote er vores username og P2gruppe#mote er vores password
const connection = new Sequelize("EventMan", "remote", "P2grupper#mote",{
    //specificere hvilken slags database vi bruger
    dialect: "mysql",
    //ip for host
    host: "10.92.0.104",
    //vi vil ikke have timestamps, og vi vil gerne fryse tablen når vi henter den
    define: {
        timestamps: false,
        freezeTableName: true,
    }
});

module.exports = connection;