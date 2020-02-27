const passport =require('passport');
const User = require('../../models/User.model');


/////// REQUIRE ALL THE STRATEGIES ////////////
// require('./local-strategy');

require('./google-strategy.config');
///////////////////////////////////////////////

// serializeUser => what to be saved in the session
                           // cb stands for callback
passport.serializeUser((user, cb) => {
  // null === no errors, all good
  cb(null, user._id); // ==> save user id into session
});

// deserializeUser => retrieve user's data from the database
// this function gets called every time we request for a user (every time when we need req.user)
passport.deserializeUser((userId, cb) => {
    User.findById(userId)
    .then(user => {
      cb(null, user);
    })
    .catch( err => cb(err));
})

function passportBasicSetup(app){

  // passport super power is here:
  app.use(passport.initialize()); // <== 'fires' the passport package
  app.use(passport.session()); // <== connects passport to the session

  app.use((req, res, next) => {
      if(req.user){
        // req.user comes with the passport package and if we don't use it, we lose it blaaa
      res.locals.currentUser = req.user; // <== make currentUser variable available in all hbs whenever we have user in the session
    }
    next();
  })
}

module.exports = passportBasicSetup;