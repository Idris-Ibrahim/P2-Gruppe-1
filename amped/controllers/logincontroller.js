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
    .then( function(Group){ //derefter tager den dette group_name og finder alt informationen fra dens group i forhold til "Groups"-modellen.
        if (Group === null){ //den tjekker om Username ikke matcher en group_name i databasen.
            res.send("Username and/or Password is incorrect") //hvis dette er tilfældet sendes denne respons til brugeren.
            return
        }
        if (Password !== Group.password){ //Her tjekkes om Password ikke matcher det password i den Group som er i databasen for samme group_name.
            res.send("Username and/or Password is incorrect") //Hvis det ikke matcher sendes denne respons til brugeren
            return
        } 
        req.session.loggedIn = true //ved korrekt login dannes en session og sessionen indeholder en værdi, "loggedIn", som vi bruger til at tjekke om brugere er logged in
        req.session.Group = Group //her skabes et objekt i sessionen hvorå vi ligger alt Group informationen, fra databasen, om den bruger som er logged in, i forhold til "Groups"-modellen


        if(Group.roles == 0){ //tjekker om Gruppe rollen for den bruger som er logged in er 0
            res.redirect("/events") //hvis dette er tilfældet bliver brugeren ført til hovedsiden/events siden
        } else if (Group.roles == 2){ //tjekker om Gruppe rollen for den bruger som er logged in er 2
            res.redirect("/admin") //hvis dette er tilfældet bliver brugeren ført til admin panelet
        }else if (Group.roles == 1){ //tjekker om Gruppe rollen for den bruger som er logged in er 1
            res.redirect("/grouppanel") //hvis dette er tilfældet bliver brugeren ført til gruppe panelet
        }
        

            
 

    })
    .catch(function(){ //hvis promiset bliver rejected catcher denne funktion brugeren
        res.send("Username and/or Password is incorrect") //dette er den respons brugeren får hvis promiset bliver rejected og funktionen kører
        return
    })
    



}   

exports.logout = (req, res, next) => { //Her exportes logout controlleren
req.session.destroy() //hvis denne funktion kører afsluttes sessionen og brugeren bliver derpå logget ud
res.redirect("/login") // brugeren bliver ført til login siden nu da brugeren ikke længere er logget in


}
