const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Groups = require("../models/groups");

// se alle groups
exports.viewgroups = (req, res, next) => {
    return Groups.findAll({where: {'roles':{ [Op.gt]: 0}}})
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
    if (idcheck == 1){
            res.send('You cannot update admin role')
    }else{
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
        })

    }
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
    const navn = req.body.group_name
    const passwordcheck = req.body.password
    console.log(idcheck)
    if (req.session.loggedIn !== true || req.session.Group.roles < 2) {
        res.render("nopugmission")
        return
    }
    if (passwordcheck.length < 3){
        res.send('password must be more than 3 characters');
    }else if(navn.length < 3){
        res.send('groupname must be more than 3 characters');
    }
            //checks if name is already in use:
        Groups.findAll({where : {'group_name':{ [Op.eq]: navn}}})
            .then(function(data){
                if (data.length == 0 && navn.length > 0){
                    Groups.update(
                        // Values to update
                        {
                            id:idcheck,
                            group_name: navn,
                            group_about: req.body.group_about,
                            group_email: req.body.group_email,
                            password: passwordcheck,
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
                }else{
                    res.send('Username is either already in use or empty');
                }
                })
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