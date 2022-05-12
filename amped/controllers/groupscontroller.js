const Sequelize = require("sequelize");
const {Datatypes, Op} = Sequelize;
const Groups = require("../models/groups");
const Events = require("../models/events");

// se alle groups
exports.viewgroups = (req, res, next) => {
    return Groups.findAll()
        .then((data) => {
            res.render('groups', {grouplist: data },
            console.log(data));
        })
        .catch((err) => {
            console.log(err)
        });
}

//justering af group status til at kunne lave events:
exports.grouproleone = function(req, res, next){
    const idcheck = req.query.id
    console.log(idcheck)
    Groups.update(
        // Values to update
        {
            roles : 1
        },
        //what group to update
        {
            where: {'id' : { [Op.eq]: idcheck}}
        }).then(function (groups) {
        if (groups) {
            res.redirect('/admin/groups');
        } else {
            response.status(400).send('Error in delete');
        }
    });
}


// slet grupper

exports.groupsdelete = function(req, res, next){
    if (req.session.loggedIn !== true || req.session.Group.roles < 2){
        res.render("nopugmission")
        return
    }
    const idcheck = req.query.id
    console.log(idcheck)
    return Groups.destroy({
        //slet ud fra id
        where: {'id' : { [Op.eq]: idcheck} }
    }).then(function (groups) {
        if (groups) {
            res.redirect('/admin/groups');
        } else {
            response.status(400).send('Error in delete');
        }
    });
}

// viser update group page
exports.updateadmin = (req, res, next) => {
    const idcheck = req.query.id
    console.log(idcheck)
    Groups.findAll({where: {'id': {[Op.eq]: idcheck}}})
        .then(function (data) {
            res.render('adminupdate', {grouplist: data},
                console.log(data));

        })
}

// Update Group
exports.groupsupdate = function (req, res, next) {
    const idcheck = req.body.id
    console.log(idcheck)
    if (req.session.loggedIn !== true || req.session.Group.roles < 2) {
        res.render("nopugmission")
        return
    }

    Groups.update(
        // Values to update
        {
            id:idcheck,
            group_name: req.body.group_name,
            group_about: req.body.group_about,
            group_email: req.body.group_email,
            password: req.body.password,
            fburl: req.body.fburl,
        },
        {
            where: {'id': {[Op.eq]: idcheck} }
        }
    ).then(function (groups) {
        if (groups) {
            res.redirect('/admin/groups');
        } else {
            response.status(400).send('Error in update');
        }
    });
}

//
exports.groupinfo = function(req, res, next){
        const idgroupcheck = req.query.id
        console.log(idgroupcheck)
        Groups.findAll({where: {'id' : { [Op.eq]: idgroupcheck} }})
    
        .then(function(data) {
            res.render('groupinfo', {grouplist: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}
