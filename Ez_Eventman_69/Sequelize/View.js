// Brugt denne guide https://www.youtube.com/watch?v=jWdVy265Q-A
const sequelize = require("./SequelizeDB");
const Sequelize = require("sequelize");
//Op operator functionality
const {Datatypes, Op} = Sequelize;
const Events = require("./EventmanSequlize.js");

ListEvents: (callback) => {

Events.sync({ alter: true }).then(()  => {
    return Events.findAll({ order: [['dato'],['tid']]});
}).then((data) => {
    data.forEach((element) => {
        console.log(element.toJSON());
        dokument.write(element);
    })
})
    .catch((err) => {
        console.log(err)
    });

}
module.export = ListEvents;