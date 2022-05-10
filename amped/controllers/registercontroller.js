const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups"); //skal implementeres


exports.registerpage = (req, res, next) => {
    res.render("register")
}

exports.registeradmin = (req, res, next) => {
    res.render("adminopret")
}

// register group
exports.registergroups = (req, res, next) => {
    const navn = req.body.group_name
    console.log(navn)
        //checks if name is already in use:
        Groups.findAll({where : {'group_name':{ [Op.eq]: navn}}})
        .then(function(data){
            if (data.length == 0){
                Groups.create({
                    group_name: req.body.group_name,
                    group_email: req.body.group_email,
                    password: req.body.password,
                    group_about: req.body.GruppeBeskrivelse,
                    fburl: req.body.FacebookURL,
                    roles: 0
                })
                res.redirect('/login')
            }else{
                response.status(400).send('Username already in use');
            }
        })
}