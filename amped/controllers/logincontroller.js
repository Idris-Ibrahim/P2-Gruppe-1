const Sequelize = require("sequelize");
const Groups = require("../models/groups");
const {Datatypes, Op} = Sequelize;
const Users = require("../models/groups"); //skal implementeres

exports.loginpage = (req, res, next) => {
    if(req.session.loggedin) {
        res.redirect("/events")
        return
    }
    res.render('login')
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

        if(Group.roles == 0){
            res.redirect("/events")
        } else if (Group.roles == 2)
            res.redirect("/admin")
 

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
