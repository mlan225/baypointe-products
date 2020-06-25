var express = require('express');
var router = express.Router();

router.get('/timberland', (req, res) => {
  res.render("room");
})


module.exports = router;