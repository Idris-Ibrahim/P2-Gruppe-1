
const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Events = require("../models/groups");


exports.viewgroups = (req, res, next) => {
    return Events.findAll()
        .then((data) => {
            res.render('groups', {grouplist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}

// register group
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

