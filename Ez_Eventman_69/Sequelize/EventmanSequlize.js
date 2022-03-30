const Sequelize = require("sequelize");
const connection = require("./Sequelize");

const Events = connection.define("Events", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    orgname:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    event_name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    event_type:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    beskrivelse:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    lokation:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    tid:{
        type: Sequelize.TIME,
        allowNull: false,
    },
    dato:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    pris:{
        type: Sequelize.DECIMAL,
        allowNull: true,
    },
    fburl:{
        type: Sequelize.STRING,
        allowNull: true,
    },
   /* pic:{
        type: Sequelize.BLOB,
        allowNull: true,
    },
    */
});

module.exports = Events;