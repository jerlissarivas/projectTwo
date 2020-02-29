const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, done) => {
    User.findOne({
        email
      })
      .then(foundUser => {
        if (!foundUser) {
          done(null, false, {
            message: 'Incorrect username'
          });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          done(null, false, {
            message: 'Incorrect password'
          });
          return;
        }

        done(null, foundUser);
      })
      .catch(err => done(err));
  }
));

passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: '/google/callback',
  proxy: true // important for production
}, (accessToken, refreshToken, userInfo, next) => {
  // console.log('Google acc: ', userInfo);

  // use ES6 destructuring instead of having this:
  // const displayName = userInfo.displayName;
  const {
    id,
    name: {
      givenName,
      familyName
    },
    emails
  } = userInfo;


  // we don't want users to have double accounts in our app, that's why we will check if we already have
  // user with the gmail he's using, and if yes, we will just log them in
  User.findOne({
      $or: [{
          email: emails[0].value
        },
        {
          googleID: userInfo.id
        } // => this step might be "over protection" of our app but you know ... 🤷‍♀️
      ]
    })
    .then(user => {
      if (user) {
        next(null, user); // log in the user if the user already exists
        return;
      }

      // if we don't find the user in the DB, then create one
      User.create({
          email: emails[0].value,
          firstName: givenName,
          lastName: familyName,
          googleID: id
        })
        .then(newUser => next(null, newUser))
        .catch(err => next(err));
    })
    .catch(err => next(err));
}))