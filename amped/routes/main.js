const express = require('express');
const router = express.Router();



// Require controller modules.
const events_controller = require('../controllers/eventscontroller');
const groups_controller = require('../controllers/groupscontroller');
const admin_controller = require('../controllers/admincontroller');
const calendar_controller = require('../controllers/calendarcontroller');
const search_controller = require('../controllers/searchcontroller');
const login_controller = require('../controllers/logincontroller');
const register_controller = require('../controllers/registercontroller');
const script_controller = require('../controllers/scriptcontroller');



// main page
router.get('/', events_controller.viewevents);



/// Events:

// gets all sorted events from events_controller
router.get('/events', events_controller.viewevents);
router.get('/events', groups_controller.viewgroups);

// gets all events sorted ASC
router.get('/events/sortddateasc', events_controller.viewevents);

// gets all events sorted DESC
router.get('/events/sortddatedesc', events_controller.eventsdesc);

// gets all sorted events with event name ASC from events_controller
router.get('/events/eventnameasc', events_controller.eventnameasc);

// gets all sorted events with event name DESC from events_controller
router.get('/events/eventnamedesc', events_controller.eventsdesc);


//search
router.get(`/events/search`, search_controller.eventsearch);
router.get(`/groups/search`, search_controller.groupsearch);



/// Groups:
router.get('/groups', groups_controller.viewgroups);


//group info
router.get(`/groupinfo/`,groups_controller.groupinfo);

//calendar
router.get('/calendar',calendar_controller.calendar);



/// login

// get login page
router.get('/login', login_controller.loginpage);
router.post('/login', login_controller.loggingin);
router.get('/logout', login_controller.logout);


// register

router.get('/register', register_controller.registerpage);

router.post('/register',register_controller.registergroups);


///admin
//
router.get('/admin', admin_controller.adminpage);
// se gruper
router.get('/admin/groups', admin_controller.viewgroups);
//slet grupper
router.post('/:id', groups_controller.groupsdelete);
// se events
router.get('/admin/events', admin_controller.viewevents);

//script controller
router.get('/config/scripts/fullcalendar.css', script_controller.fullcalendarcss);
router.get('/config/scripts/fullcalendar.js', script_controller.fullcalendarjs);


// Details


module.exports = router;
