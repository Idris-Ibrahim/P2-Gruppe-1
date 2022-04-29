const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Search = require("../views/search");
const Events = require("../models/events");
var name = Events.event_name;

/*
const button = document.getElementById('button');

    function madting(){

    const value = Search.querySelector('input').value;
    console.log(value);
    var Searchvalue = value.toLowerCase();

    for (const event_name_lowercase of name) {
        let name = event_name_lowercase.textcontent.toLowerCase();
            // compare current name to search input
    if (name.includes(Searchvalue)) {
            exports.eventnamesearched =  function (req, res, next) {
            return Events.findAll({[['event_name', name.includes(Searchvalue)]]})
                    .then(function(data) {
                        res.render('events', {eventlist: data });
                    });
                }}}

           

         
    }; 
*/