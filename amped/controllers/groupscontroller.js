
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
