var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/login', (req, res) => {
  res.render('login');
})

router.post("/login", passport.authenticate('local',
{
  successRedirect: "/",
  failureRedirect: "/user/login"
}))

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/');
})


// the register routes will only be used to add one admin account and commented out afterwards.
// Keeping code commented out for future use
router.get('/register', (req, res, next) => {
  res.render('register');
})

router.post('/register', (req, res, next) => {
  var user = {
    username: req.body.username
  }

  User.register(user, req.body.password, (err, user) => {
    if(err) {
      console.log(err)
      return res.render('register');
    }

    passport.authenticate("local")(req, res => {
      res.redirect("/admin/dashboard")
    })
  })
})

module.exports = router;