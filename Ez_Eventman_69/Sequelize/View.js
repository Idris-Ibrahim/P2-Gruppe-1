const sequelize = require("./SequelizeDB");
const Sequelize = require("sequelize");
//Op operator functionality
const {Datatypes, Op} = Sequelize;
const Events = require("./EventmanSequlize");

sequelize
Events.sync({ alter: true }).then(()  => {
    return Events.findAll({ where: { id: {[Op.gt]: 2}}});
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
    })
})
    .catch((err) => {
        console.log(err)
    });
// Brugt denne guide https://www.youtube.com/watch?v=jWdVy265Q-A

