const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
//getting search input:
/*exports.eventsearch = function (req, res, next){
    var searchString = req.body.search
    var searchfilter = Events.filter(function(req, res, next){
      return Events.event_name.includes(searchString) || Events.orgname.includes(searchString)
    })
    res.render('search', {eventlist: searchfilter});
}*/
exports.eventsearch = function (req, res, next){
    let input = req.body.searchss;
    console.log(input);
       return Events.findAll({where: {Events : Events.event_name.includes(input)}})

       .then(function(data) {
        res.render('events', {eventlist: data });
    })
    .catch( function(err)  {
        console.log(err)
    });
}

/*


searchbar = req.body.search
searchbar.addEventListener('keyup', function(req, res, next){
    var searchString = searchfilter



button.addEventListener('click', eventnamesearched);
const searchInput = Events.querySelector('.input')
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

