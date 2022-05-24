const Sequelize = require("sequelize");
const {Op} = Sequelize;
const Groups = require("../models/groups");

// se alle groups
exports.viewgroups = (req, res, next) => {
    //finder alle grupper hvor id er 1 eller over.
    return Groups.findAll({where: {'roles':{ [Op.gt]: 0}}})
        .then((data) => {
            //render de fudne grupper ud til groups.pug
            res.render('groups', {grouplist: data },
            console.log(data));
        })
        .catch((err) => {
            console.log(err)
        });
}

//justering af group status til at kunne lave events:
exports.grouproleone = function(req, res, next){
    //gemmer id vi finder fra req.query i en local konstant variabel
    const idcheck = req.query.id
    console.log(idcheck)
    //tjekker om id på den gruppe der skal opdateres til role 1 er id = 1
    //dette er fordi at id = 1 er admins(Amped) id og hvis vi opdatere den gruppe til role 1
    //så har vi ingen admins og kan derfor ikke gøre brug af adminpanelet
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
        //tjekker om en bruger er i session og om den bruger har roles: 2 (er admin)
        res.render("nopugmission")
        return
    }
    //gemmer id vi finder fra req.query i en local konstant variabel
    const idcheck = req.query.id
    if (idcheck == 1){
        res.send('You cannot delete admin group')
    }else{
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
}

// viser update group page
exports.updateadmin = (req, res, next) => {
    //gemmer id i en lokal variabel
    const idcheck = req.query.id
    console.log(idcheck)
    //finder den information fra det event vi vil opdatere
    Groups.findAll({where: {'id': {[Op.eq]: idcheck}}})
        .then(function (data) {
            //render admin update siden
            res.render('adminupdate', {grouplist: data},
                console.log(data));

        })
}

// Update Group for admins
exports.groupsupdate = function (req, res, next) {
    //gemmer id, groupname og password i lokale variabler
    const idcheck = req.body.id
    const navn = req.body.group_name
    const passwordcheck = req.body.password
    //tjekker om det er en admin der er i session
    if (req.session.loggedIn !== true || req.session.Group.roles < 2) {
        res.render("nopugmission")
        return
    }
    //tjekker om det givne password er minimum længde 3
    if (passwordcheck.length < 4){
        res.send('password must be more than 3 characters');
    //tjekker om det givne gruppe navn er minimum længde 3
    }else if(navn.length < 3){
        res.send('groupname must be more than 2 characters');
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
                            //redirecter til admin/groups
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

//group info ud fra click i groups siden
exports.groupinfo = function(req, res, next){
        //gemmer id'et i en lokal variabel
        const idgroupcheck = req.query.id
        console.log(idgroupcheck)
        //finder gruppen tilhørende det id vi har fundet via click
        Groups.findAll({where: {'id' : { [Op.eq]: idgroupcheck} }})
    
        .then(function(data) {
            //render til groupinfo.pug
            res.render('groupinfo', {grouplist: data },
            console.log(data));
        })
        .catch( function(err)  {
            console.log(err)
        });
}