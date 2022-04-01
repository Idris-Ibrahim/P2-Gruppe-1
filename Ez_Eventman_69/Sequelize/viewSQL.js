const sequelize = require("./Sequelize");


const Events = require("./EventmanSequlize");

//koden under kan danne en pathway fra orgname til organitations tabled.
//Events.hasMany(Orgname);

//force erstatter forige data:
sequelize
.sync(/*{force:true}*/)
.then((result)=>{
    //dato skal være: (år-måned-dag):
    Events.create({orgname:"Scrumklubben",event_name: "Scrummespil",lokation: "Scrumkammeret på AAU",tid: "13:34",dato:"2023-04-14"});
    console.log(result);

})

//catcher en error hvis der opstår en
.catch ((err) =>{
    console.log(err);
});
