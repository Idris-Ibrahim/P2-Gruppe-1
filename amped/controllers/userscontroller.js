const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Users = require("../models/users");
const connection = require("../config");

// register user
exports.registergroups = async function (req, res, next) {
    await Groups.create({
        username: req.body.group_name,
        email: req.body.email,
        password: req.body.password
    }).then(function (groups) {
        if (groups) {
            res.redirect('/login');
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
}

exports.logingroup = async function (req, res, next) {

}


