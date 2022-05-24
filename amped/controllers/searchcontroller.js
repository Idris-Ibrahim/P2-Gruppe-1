const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Events = require("../models/events");
const Groups = require("../models/groups");

//det virker men searchss er undifined:

exports.eventsearch = function (req, res, next){
    //bruger en variabel til at gemme søgerordet som er fundet i adressbaren via req.query
   var searchInput = req.query.SearchName
       return Events.findAll(
        {order: [['dato', 'ASC'],['tid', 'ASC']],
           where:{
               //Op.or signalere at vi retunere eventen det enten hvis event_name
               //eller group_id er det samme som søgeordet
            [Op.or]: [
                //% (procenttegn) signalere at søgerinputtet kan findes inde i et ord
                { event_name: { [Op.like]: `%${searchInput}%`}},
                { group_id: {[Op.like]: `${searchInput}`}}
            ]
        }
      })
       .then(function(data) {
           //render til events.pug
       return res.render('events', {eventlist: data });
    })
    .catch( function(err)  {
        console.log(err)
    });
}

exports.groupsearch = function (req, res, next){
    //bruger en variabel til at gemme søgerordet som er fundet i adressbaren via req.query
   var searchInput = req.query.SearchGroup
       return Groups.findAll({
           //tjekker for om om søgerordet kan findes i enten, group_name, 
           //_about eller at id'et er det samme som søgeordet
           where:{
            [Op.or]: [
                { group_name: { [Op.like]: `%${searchInput}%`}},
                { group_about: { [Op.like]: `%${searchInput}%`}},
                { id : { [Op.like]: `${searchInput}`}}
            ]
        }
      })
       .then(function(data) {
           //render til groups.pug
       return res.render('groups', {grouplist: data });
    })
    .catch( function(err)  {
        console.log(err)
    });
}

exports.groupsearchadmin = function (req, res, next){
    var searchInput = req.query.SearchGroupAdmin
    //bruger en variabel til at gemme søgerordet som er fundet i adressbaren via req.query
        return Groups.findAll({
            //tjekker for om om søgerordet kan findes i enten, group_name eller about
            where:{
             [Op.or]: [
                 { group_name: { [Op.like]: `%${searchInput}%`}},
                 { group_about: { [Op.like]: `%${searchInput}%`}}
             ]
         }
       })
        .then(function(data) {
            //render til admingroups.pug
        return res.render('admingroups', {grouplist: data });
     })
     .catch( function(err)  {
         console.log(err)
     });
 }

exports.eventsearchadmin = function (req, res, next){
    var searchInput = req.query.SearchEventAdmin
    //bruger en variabel til at gemme søgerordet som er fundet i adressbaren via req.query
    return Events.findAll({
        //tjekker for om om søgerordet kan findes i enten, group_name eller id
        where:{
            [Op.or]: [
                { event_name: { [Op.like]: `%${searchInput}%`}},
                { id: { [Op.like]: `${searchInput}`}}
            ]
        }
    })
        .then(function(data) {
            //render til adminevents.pug
            return res.render('adminevents', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
}
