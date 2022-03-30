const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
.sync(/*{force:true}*/)
.then((result)=>{
    //dato skal være: (år-måned-dag):
    Events.create({orgname:"Skatklubben",event_name: "Skakspil",lokation: "AAU",tid: "14:00",dato:"2023-02-23"});
    console.log(result);
})

.catch ((err) =>{
    console.log(err);
});
