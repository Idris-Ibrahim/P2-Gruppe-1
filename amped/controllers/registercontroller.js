const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Groups = require("../models/groups"); //skal implementeres


exports.registerpage = (req, res, next) => {
    //render register.pug
    res.render("register")
}

// register group
exports.registergroups = (req, res, next) => {
    //gemmer navn og password i lokale variabler
    const navn = req.body.group_name
    const passwordcheck = req.body.password
    //chekker om kodeord er minimum 4 tegn
    if (passwordcheck.length < 4){
        res.send('password must be more than 3 characters');
    //chekker om gruppenavn er minimum 3 tegn
    }else if(navn.length < 3){
        res.send('group name must be more than 2 characters')
    }else{
    console.log(navn)
        //checks if name is already in use:
        Groups.findAll({where : {'group_name':{ [Op.eq]: navn}}})
        .then(function(data){
            if (data.length == 0){
                Groups.create({
                    group_name: navn,
                    group_email: req.body.group_email,
                    password: passwordcheck,
                    group_about: req.body.GruppeBeskrivelse,
                    fburl: req.body.FacebookURL,
                    roles: 0
                })
                //sender brugeren til login siden
                res.redirect('/login')
            }else{
                //sender en meddelselse om at gruppenavnet allerede er i brug
                res.send('Username already in use');
            }
        })
}
}
