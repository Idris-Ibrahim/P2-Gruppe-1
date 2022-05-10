const Sequelize = require("sequelize");
const connection = require("../config");
const express = require('express');
const Groups = require('./groups');

const Events = connection.define("Events", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    group_id:{
        //foreign key to Groups id
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false
    },
    event_name:{
        type: Sequelize.STRING,
        allowNull: false,
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
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
          }
          
    },
    pris:{
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: null
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

Groups.hasMany(Events, {
    foreginKey: 'group_id',
    sourceKey: 'id'
})

Events.belongsTo(Groups, {
    targetKey: 'id',
    foreignKey: 'group_id'
})
