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
router.get(`/events/search`, search_controller.eventsearch);
router.get(`/groups/search`, search_controller.groupsearch);



/// Groups:
router.get('/groups', groups_controller.viewgroups);
router.get('/grouppanel', events_controller.vieweventsforgroup)



//Calendar
router.get('/calendar', calendar_controller.calendar);



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
router.post('/admin/groups', groups_controller.groupsdelete);
// se events
router.get('/admin/events', admin_controller.viewevents);
// søg grupper
router.get(`/admin/search`, search_controller.groupsearch);
// opret gruppe
router.get('/adminopret', admin_controller.registeradmin);
router.post('/adminopret',admin_controller.adminregistergroups);
// update gruppe
router.get('/adminupdate', admin_controller.updateadmin);
router.post('/adminupdate',admin_controller.adminupdategroups);

/// Grupper
//



module.exports = router;
