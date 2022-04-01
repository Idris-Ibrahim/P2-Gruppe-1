const sequelize = require("./SequelizeDB");

const Events = require("./EventmanSequlize");


//force erstatter forige data:
sequelize
.sync(/*{force:true}*/)
.then(Events => {
  Eventsid = Events.id;
  
}) 

.then(Events => {
  
  return Events.findAll();
}) 

//catcher en error hvis der opstår en
.catch ((err) =>{
    console.log(err);
})

