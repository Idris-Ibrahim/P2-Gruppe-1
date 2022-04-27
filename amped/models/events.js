const Sequelize = require("sequelize");
const connection = require("../config");
const express =require('express');



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
        allowNull: true,
    },
    beskrivelse:{
        type: Sequelize.STRING,
        allowNull: true,
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
        type: Sequelize.DATEONLY,
        allowNull: false,
        //defining dddd-mmmm-yyyy notation for date element
        get: function() {
            return this.getDataValue('dato')
              .toLocaleString('dk-DK', { 
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
          }
          
    },
    pris:{
        type: Sequelize.DECIMAL,
        allowNull: true,
    }
    ,
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