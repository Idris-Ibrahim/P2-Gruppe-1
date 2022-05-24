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


//search
router.get(`/events/search`, search_controller.eventsearch);
router.get(`/groups/search`, search_controller.groupsearch);

//eventinfo
router.get(`/eventsinfo/`,events_controller.findOne);

// Groups:
router.get('/groups', groups_controller.viewgroups);
// landing page for groups
router.get('/grouppanel', events_controller.vieweventsforgroup)
// create event
router.get('/createevent', events_controller.createevent);
router.post('/createevent',events_controller.createevents);// create
// update event
router.get('/grouppanelupdate/', events_controller.updateeventsgroup);
router.post('/grouppanelupdate/',events_controller.eventsupdategroup);
// slet event
router.post('/grouppanel', events_controller.eventsdeletegroup);





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
// landing page få admin
router.get('/admin', admin_controller.adminpage);
// grupper
// se grupper
router.get('/admin/groups', admin_controller.viewgroups);
//slet grupper
router.post('/admin/groups', groups_controller.groupsdelete);
// Give gruppe role 1
router.post('/admin/groups/role', groups_controller.grouproleone);
// se events
router.get('/admin/events', admin_controller.viewevents);
// søg grupper
router.get('/admin/search', search_controller.groupsearchadmin);

// update gruppe
router.get('/adminupdate/', groups_controller.updateadmin);
router.post('/adminupdate/',groups_controller.groupsupdate);


//Events
// se events
router.get('/admin/events', events_controller.viewevents);
// slet events
router.post('/admin/events', events_controller.eventsdelete);
// søg events
router.get('/admin/eventsearch', search_controller.eventsearchadmin);
// update events
router.get('/adminupdateevent/', events_controller.updateeventsadmin);
router.post('/adminupdateevent/',events_controller.eventsupdate);
//script controller
router.get('/config/scripts/fullcalendar.css', script_controller.fullcalendarcss);
router.get('/config/scripts/fullcalendar.js', script_controller.fullcalendarjs);


// Details


module.exports = router;
