const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

//det virker men searchss er undifined:

exports.eventsearch = function (req, res, next){
    //req.query fik det til at virke :D, req.body eller req.params virkede ikke
   var searchInput = req.query.SearchName
       return Events.findAll({
           where:{
               //Op.or signalere at vi retunere eventen det enten hvis event_name, eller orgname indeholder vores søgeord
            [Op.or]: [
                //% (procenttegn) signalere at søgerinputtet kan findes inde i et ord og bliver displayed
                { event_name: { [Op.like]: `%${searchInput}%`}},
                /*{ group_name: { [Op.like]: `%${searchInput}%`}}*/
            ]
        }
      })

       .then(function(data) {
       return res.render('events', {eventlist: data });
    })
    .catch( function(err)  {
        console.log(err)
    });
}

exports.groupsearch = function (req, res, next){
   var searchInput = req.query.SearchGroup
       return Groups.findAll({
           where:{
            [Op.or]: [
                { group_name: { [Op.like]: `%${searchInput}%`}},
                { group_about: { [Op.like]: `%${searchInput}%`}},
                { id: { [Op.like]: `%${searchInput}%`}}
            ]
        }
      })
       .then(function(data) {
       return res.render('groups', {grouplist: data });
    })
    .catch( function(err)  {
        console.log(err)
    });
}

//getting search input:
/*exports.eventsearch = function (req, res, next){
    var searchString = req.body.search
    var searchfilter = Events.filter(function(req, res, next){
      return Events.event_name.includes(searchString) || Events.orgname.includes(searchString)
    })
    res.render('search', {eventlist: searchfilter});
}*/

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

