const Fullcalendar = require('fullcalendar');


exports.fullcalendarcss =  function (req, res, next) {
        res.sendFile(__dirname+'/static_content/fullcalendar.css')
        // .catch( function(err)  {
        //     console.log(err)
        // });
}

exports.fullcalendarjs =  function (req, res, next) {
        res.sendFile(__dirname+'/static_content/fullcalendar.js')
        //, {eventlist: data }, {calendermodule: Fullcalendar});
        // .catch( function(err)  {
        //     console.log(err)
    // });
}