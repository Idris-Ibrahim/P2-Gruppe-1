const express = require('express');
const router = express.Router();

// Require controller modules.
const events_controller = require('../controllers/eventscontrolller');
const groups_controller = require('../controllers/groupscontroller');


// main page
router.get('/', events_controller.viewevents);

/// Events
// gets all sorted events from events_controller
router.get('/events', events_controller.viewevents);

router.get('/events/sortddateesc', events_controller.eventsdesc);

/// Groups
// gets all groups from groups_controller
router.get('/groups', groups_controller.viewgroups);



module.exports = router;
