const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
Events.sync({ alter: true }).then(()  => {
    return Events.findAll();
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
    })
})
    .catch((err) => {
        console.log(err)
    });


