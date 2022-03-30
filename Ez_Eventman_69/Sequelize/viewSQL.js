const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
.sync()
.then((result)=>{
    console.log(result);
})
.catch ((err) =>{
    console.log(err);
});