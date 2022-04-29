const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
//getting search input:
const value = input.getElementById('inputId').value;
const button = input.getElementById('btn');
button.addEventListener('click', eventnamesearched);
//defining button in use:
exports.eventnamesearched =  function (req, res, next) {
    
    console.log(value);
    //search result to lower case:
    var Searchvalue = value.toLowerCase();
    var name = event_name.toLowerCase();
    
    if (name.includes(Searchvalue)) {
            return Events.findAll({ where: {name: name.includes(Searchvalue)}})
                    .then(function(data) {
                        res.render('events', {eventlist: data });
                    });
                }
            
}; 

/*
const Sequelize = require('sequelize');
const Events = require('../models/events');
const {Datatypes, Op} = Sequelize;
const Groups = require('../models/events');

exports.eventsearch = function(req, res, next){

    Events.findAll(where: { event_name: {}
    })
}
*/

