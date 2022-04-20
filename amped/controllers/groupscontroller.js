
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