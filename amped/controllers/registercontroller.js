const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups"); //skal implementeres


exports.registerpage = (req, res, next) => {
    res.render("register")
}

// register group
exports.registergroups = (req, res, next) => {
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
