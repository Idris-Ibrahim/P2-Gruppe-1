
const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups");


exports.viewgroups = (req, res, next) => {
    return Groups.findAll()
        .then((data) => {
            res.render('groups', {grouplist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}

// register group
exports.registergroups = function (req, res, next) {
        Groups.create({
        group_name: req.body.group_name,
        group_email: req.body.group_email,
        password: req.body.password,
        roles: 0
    }).then(function (groups) {
        if (groups) {
            res.redirect('/login');
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
}

//justering af group status til at kunne lave events:
exports.grouproleone = function(req, res, next){
    
    Groups.update(
        // Values to update
        {
            roles : 1
        },
        //what group to update
        {
            where: {id: req.body.id}
        },
        console.log(result))
        //catching error
    .catch ((err) => {
        console.log(err);
    });
}
