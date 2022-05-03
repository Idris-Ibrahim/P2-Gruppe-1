const express = require('express');
const router = express.Router();
var searchInput = require("../controllers/searchcontroller");

// Require controller modules.
const events_controller = require('../controllers/eventscontroller');
const groups_controller = require('../controllers/groupscontroller');
const admin_controller = require('../controllers/admincontroller')
const search_controller = require('../controllers/searchcontroller')

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

//search
router.get(`/events/search`, search_controller.eventsearch)


/// Groups:

// gets all groups from groups_controller
router.get('/groups', groups_controller.viewgroups);

//Kalender
router.get('/calendar', (req, res) => {
    res.render('calendar')
})

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

router.get('/admin', (req, res) => {
    res.render('admin')
})

router.get('/Calendar');

//admin page:
router.get('/admin/groups', admin_controller.viewgroups);
router.get('/admin/events', admin_controller.viewevents);


module.exports = router;
