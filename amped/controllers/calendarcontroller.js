const router = require("express").Router();
const Events = require("../models/events");


router.post("/creat-event", async (req,res) => {
    const events = Events(req.body);
    await event.save();
    res.sendStatus(201);
})

router.get("/get-events", async (req,res) => {
    const events = await Events.findAll({ order: [['dato'],['tid']]})
        .then(function(data) {
            res.render('events', {eventlist: data });
        })
        .catch( function(err)  {
            console.log(err)
        });
    res.send(events);
});


module.exports = router;