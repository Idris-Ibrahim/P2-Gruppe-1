const Sequelize = require("sequelize");
const Groups = require("../models/groups");
const {Datatypes, Op} = Sequelize;
const Users = require("../models/groups"); //skal implementeres

exports.loginpage = (req, res, next) => {
    res.render('login')
}

exports.loggingin = (req, res, next) => {
    const Username = req.body.username
    const Password = req.body.password
    if(!Username || !Password ){
         res.send("Username and/or Password is incorrect")
        return
    }

    Groups.findOne({where: {group_name : Username}})
    .then( function(Group){
        if (Group === null){
            res.send("Username and/or Password is incorrect")
            return
        }
        if (Password !== Group.password){
            res.send("Username and/or Password is incorrect")
            return
        } 
        res.redirect("/events")

    })
    .catch(function(){
        res.send("Username and/or Password is incorrect")
        return
    })
    



}   
