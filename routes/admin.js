var express = require('express');
var router = express.Router();
var {isLoggedIn} = require('../controllers/middleware');

router.get('/', isLoggedIn, (req, res) => {
  res.render('admin_dashboard');
})

module.exports = router;