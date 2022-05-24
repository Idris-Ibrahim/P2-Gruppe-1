const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

//det virker men searchss er undifined:

exports.eventsearch = function (req, res, next){
    //req.query fik det til at virke :D, req.body eller req.params virkede ikke
   var searchInput = req.query.SearchName
       return Events.findAll(
        {order: [['dato', 'ASC'],['tid', 'ASC']],
           where:{
               //Op.or signalere at vi retunere eventen det enten hvis event_name
               //eller orgname indeholder vores søgeord
            [Op.or]: [
                //% (procenttegn) signalere at søgerinputtet kan findes inde i et ord
                { event_name: { [Op.like]: `%${searchInput}%`}},
                { group_id: {[Op.like]: `${searchInput}`}}
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
                { id : { [Op.like]: `${searchInput}`}}
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

exports.groupsearchadmin = function (req, res, next){
    var searchInput = req.query.SearchGroupAdmin
        return Groups.findAll({
            where:{
             [Op.or]: [
                 { group_name: { [Op.like]: `%${searchInput}%`}},
                 { group_about: { [Op.like]: `%${searchInput}%`}}
             ]
         }
       })
        .then(function(data) {
        return res.render('admingroups', {grouplist: data });
     })
     .catch( function(err)  {
         console.log(err)
     });
 }

exports.eventsearchadmin = function (req, res, next){
    var searchInput = req.query.SearchEventAdmin
    return Events.findAll({
        where:{
            [Op.or]: [
                { event_name: { [Op.like]: `%${searchInput}%`}},
                { id: { [Op.like]: `%${searchInput}%`}}
            ]
        }
    })
        .then(function(data) {
            return res.render('adminevents', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}