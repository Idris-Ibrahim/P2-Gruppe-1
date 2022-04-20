var express = require('express');
var router = express.Router();
var view = require("../Sequelize/View.js");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a scrum');
});

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/test', view.viewevents);
module.exports = router;
