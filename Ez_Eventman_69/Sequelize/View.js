const sequelize = require("./Sequelize");

const Events = require("./EventmanSequlize");

sequelize
.sync()
.then(Events =>{
    const viewEvents = await Events.findALL();
    console.log(viewEvents.every(viewEvent => viewEvent instanceof Events));
    console.log("All users:", JSON.stringify(users, null, 2));
});

