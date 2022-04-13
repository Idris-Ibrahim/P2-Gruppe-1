// Brugt denne guide https://www.youtube.com/watch?v=jWdVy265Q-A
const Sequelize = require("sequelize");
const async = require("async");
//Op operator functionality
const {Datatypes, Op} = Sequelize;
const Events = require("./EventmanSequlize");
//
// Events.sync({ alter: true }).then(()  => {
//     return Events.findAll({ order: [['dato'],['tid']]});
// }).then((data) => {
//     data.forEach((element) => {
//         console.log(element.toJSON());
//     })
// })
//     .catch((err) => {
//         console.log(err)
//     });


exports.viewevents = (req, res, next) => {
    return Events.findAll({ order: [['dato'],['tid']]})
        .then((data) => {
            data.forEach((element) => {
                console.log(element.toJSON().event_name);
                res.render('view', { title: 'Begivenheder', eventlist: element.toJSON() });
            })
        })
        .catch((err) => {
            console.log(err)
    });
}
