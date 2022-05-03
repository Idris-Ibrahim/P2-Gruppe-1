const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Users = require("../models/groups"); //skal implementeres

exports.loginpage = (req, res, next) => {
    res.render('login')
}
