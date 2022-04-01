const sequelize = require("./SequelizeDB");

const Events = require("./EventmanSequlize");

//koden under kan danne en pathway fra orgname til organitations tabled.
Events.hasMany(Orgname);

//force erstatter forige data:
sequelize
.sync(/*{force:true}*/)
.then((result)=>{
    //dato skal være: (år-måned-dag):
    Events.create({orgname:"Kebabklubben",event_name: "Spisning",lokation: "Kebabbiksen",tid: "17:00",dato:"2023-04-05"});
    console.log(result);
}) 

//catcher en error hvis der opstår en
.catch ((err) =>{
    console.log(err);
})
