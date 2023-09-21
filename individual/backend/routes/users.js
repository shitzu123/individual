var express = require('express');
var router = express.Router();
var User = require("../models/controllers/user");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.post("/login",User.login_user);
router.post("/signup",User.create_user);


module.exports = router;
