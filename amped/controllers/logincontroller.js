const Groups = require("../models/groups"); //Her henter vi "Groups"-modellen fra "/models/groups".

exports.loginpage = (req, res, next) => { //her exporteres controlleren "loginpage".
    if(req.session.loggedIn) { //her er et if statement som tjekker om session.loggedIn eksistere, dette er tilfældet ved login.
        res.redirect("/events") // Hvis session.loggedIn eksistere, altså man allerede er logged in så redirectes man til "events" siden.
        return
    }
    res.render('login') // Hvis session.loggedIn ikke eksistere, ergo man ikke er logged in, føres man til login siden.
}

exports.loggingin = (req, res, next) => { //her exporteres controlleren "loggingin".
    const Username = req.body.Username // Teksten hentes fra feltet username på login siden.
    const Password = req.body.password // Teksten hentes fra feltet password på login siden.
    if(!Username || !Password ){ // et if statement som tjekker om Username eller Password ikke eksisterer.
         res.send("Username and/or Password is incorrect") // hvis Username og Password ikke eksistere sendes denne respons til brugeren.
        return
    }

    Groups.findOne({where: {group_name : Username}}) //Her bruges sequelize til at finde en bruger med dette Username i databasen ved hjælp af et objekt fra "Groups"-modellen, group_name.
    .then( function(Group){ //derefter tager den dette group_name og finder alt informationen fra dens group i forhold til "Groups"-modellen
        if (Group === null){ //Hvis Username
            res.send("Username and/or Password is incorrect")
            return
        }
        if (Password !== Group.password){
            res.send("Username and/or Password is incorrect")
            return
        } 
        req.session.loggedIn = true
        req.session.Group = Group


        if(Group.roles == 0){
            res.redirect("/events")
        } else if (Group.roles == 2){
            res.redirect("/admin")
        }else if (Group.roles == 1){
            res.redirect("/grouppanel")
        }
        

            
 

    })
    .catch(function(){
        res.send("Username and/or Password is incorrect")
        return
    })
    



}   

exports.logout = (req, res, next) => {
req.session.destroy()
res.redirect("/login")


}
