const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Main = require("../models/main");

exports.viewintro = (req, res, next) => {
    return Main.findAll()
        .then((data) => {
            res.render('main', {mainlist: data });
        })
        .catch((err) => {
            console.log(err)
        });
}
