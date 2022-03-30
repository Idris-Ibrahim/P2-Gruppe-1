const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
.sync()
.then((result)=>{
    Events.create({orgname:"Scrumkluben",event_name: "Stadning_scrum",lokation: "AAU",tid: "12:30",dato:"2023-02-02"});
    console.log(result);
})

.catch ((err) =>{
    console.log(err);
});
