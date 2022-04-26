const express = require('express');
const router = express.Router();

// Require controller modules.
const events_controller = require('../controllers/eventscontrolller');
const groups_controller = require('../controllers/groupscontroller');
const admin_controller = require('../controllers/admincontroller');


// main page
router.get('/', events_controller.viewevents);

/// Events:

// gets all sorted events from events_controller
router.get('/events', events_controller.viewevents);

// gets all events sorted ASC
router.get('/events/sortddateasc', events_controller.viewevents);

// gets all events sorted DESC
router.get('/events/sortddatedesc', events_controller.eventsdesc);

// gets all sorted events with event name ASC from events_controller
router.get('/events/eventnameasc', events_controller.eventnameasc);

// gets all sorted events with event name DESC from events_controller
router.get('/events/eventnamedesc', events_controller.eventsdesc);


/// Groups:

// gets all groups from groups_controller
router.get('/groups', groups_controller.viewgroups);

/// login
// get login page
router.get('/login', (req, res) => {
    res.render('login')
})

// Login us

// register

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register',groups_controller.registergroups);



//admin page:
router.get('/admin', admin_controller.viewevents.viewgroups);


module.exports = router;
