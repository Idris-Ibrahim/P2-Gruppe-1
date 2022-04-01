const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
.sync()
.then(Events =>{
    return Events.findAll({where: dato < 0});

})
.then(Events =>{
  console.log(Events)

});

