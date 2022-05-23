exports.fullcalendarcss =  function (req, res, next) {
        res.sendFile(__dirname+'/static_content/fullcalendar.css')
}

exports.fullcalendarjs =  function (req, res, next) {
        res.sendFile(__dirname+'/static_content/fullcalendar.js')
}
