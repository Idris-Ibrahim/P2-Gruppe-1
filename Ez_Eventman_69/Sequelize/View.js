const sequelize = require("./SequelizeDB");

const Events = require("./EventmanSequlize");

sequelize
Events.sync({ alter: true }).then(()  => {
    return Events.findAll({});
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
    })
})
    .catch((err) => {
        console.log(err)
    });
// Brugt denne guide https://www.youtube.com/watch?v=jWdVy265Q-A

