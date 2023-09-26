var express = require('express');
var router = express.Router();
var User = require("../models/controllers/user");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post("/login",User.login_user);
router.post("/signup",User.create_user);
router.post("/add_event",User.create_training);
router.get('/display_event',User.view_events);
router.get('/delete_event',User.delete_event);
router.get('/music_events',User.music_event);
router.get('/yoga_events',User.yoga_event);
router.get('/sports_events',User.sports_event);
router.post('/book_tickets',User.book_tickets);
router.get('/get_bookings',User.display_bookings);


module.exports = router;
