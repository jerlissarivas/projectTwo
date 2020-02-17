// routes/auth.routes.js

const { Router } = require('express');
const router = new Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');

// SIGN UP ROUTE

// .get() route ==> to display the signup form to users
router.get('/signup', (req, res) => res.render('auth/signup'));

// .post() route ==> to process form data
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        // username: username
        username,
        email,
        // passwordHash => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);
      res.redirect('/userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', { 
           errorMessage: 'Username and email need to be unique. Either username or email is already used.' 
        });
      } else {
        next(error)
      }
    });
});

// LOGIN ROUTE

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', (req, res, next) => {
  // console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (!email || !password) {
    res.render('auth/signup', { errorMessage: 'All fields are mandatory. Please provide your both, email and password.' });
    return;
  }
  //            email: email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        // res.render('users/user-profile', { user });
        // req.session.currentUser = user;
        res.redirect('/userProfile');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(err => next(err));
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));
// NEED TO ADD ROUTEGUARD TO THIS PORTION SO ONLY LOGGED IN USERS CAN SEE A USER-PROFILE

module.exports = router;
