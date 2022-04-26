
const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups");


exports.viewgroups = (req, res, next) => {
    return Groups.findAll()
        .then((data) => {
            res.render('Groups', {grouplist: data });
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

//justering af admin status:
/*
exports.registergroups = async function (req, res, next) {
    await Groups.create({
        group_name: req.body.group_name,
        email: req.body.email,
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
*/
