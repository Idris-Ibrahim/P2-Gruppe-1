const Sequelize = require("sequelize");
const Groups = require("../models/groups");
const {Datatypes, Op} = Sequelize;
const Users = require("../models/groups"); //skal implementeres

exports.loginpage = (req, res, next) => {
    if(req.session.loggedin == true && req.session.roles == 0) {
        res.redirect("/events")
    } else if (req.session.loggedin ==true && req.session.roles == 2){
        res.redirect("/admin")
    } else {
    res.render('login')
    return
    }
}

exports.loggingin = (req, res, next) => {
    const Username = req.body.Username
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
        req.session.loggedin = true
        req.session.Group = Group
        res.redirect("/events")

    })
    .catch(function(){
        res.send("Username and/or Password is incorrect")
        return
    })
    



}   

exports.logout = (req, res, next) => {
req.session.destroy()
res.redirect("/login")


}
