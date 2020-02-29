// routes/auth.routes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

// const bcrypt = require("bcrypt"); // Marcos code

const bcryptjs = require('bcryptjs');
const bcryptSalt = 10; // Marcos's code

const passport = require('passport');


// LOGIN ROUTE FROM NEW CODE

// router.get("/login", (req, res, next) => {
//   res.render("auth/login");
// });

// // router.post(
// //         "/login",
// //         passport.authenticate("local", {
// //             successRedirect: "/profile",
// //             failureRedirect: "/auth/login",
// //             passReqToCallback: true
// //         })
// //     );

// router.post("/login", (req, res, next) => {
//   // Find the user by the email
//   User.findOne({ email: req.body.email })
//       .then(userFromDB => {
//           // If a user is not returned from a DB, send back message that no such user exists in DB
//           if (userFromDB === null) {
//               res.render("auth/login", {
//                   message: "That email was not found in the system"
//               });
//               return;
//           }

//           // Compare users encrypted password with an encryption from DB and redirect to home page if they match otherwise redirect to login
//           if (bcryptjs.compareSync(req.body.password, userFromDB.password)) {
//               req.session.user = userFromDB;
//               res.redirect("/");
//             } else {
//                 res.render("auth/login", { message: "Incorrect Password" });
//               return;
//           }
//       })
//       .catch(err => next(err));
// });

// LOGIN ROUTE FROM OLD CODE

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  // Find the user by the username
  User.findOne({ email: req.body.email })
      .then(userFromDB => {
          // If a user is not returned from a DB, send back message that no such user exists in DB
          if (userFromDB === null) {
              res.render("auth/login", {
                  message: "That email was not found in the system"
              });
              return;
          }

          // Compare users encrypted password with an encryption from DB and redirect to home page if they match otherwise redirect to login
          if (bcryptjs.compareSync(req.body.password, userFromDB.password)) {
              req.session.user = userFromDB;
              res.redirect("/profile");
          } else {
              res.render("auth/login", { message: "Incorrect Password" });
              return;
          }
      })
      .catch(err => next(err));
});

// SIGNUP ROUTE FROM OLD CODE

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  // get the username and password from the request
  const firstName = req.body.firstName;
  const lastName = req.body.lastName
  const email = req.body.email;
  const password = req.body.password;

  // make sure that we have both of the fields as nonempty characters // it is not a bad idea for this to also be done on the frontend

  if (firstName === "" || lastName === "" || email === "" || password === "") {
          res.render("auth/signup", {
            message: "All fields are mandatory!"
          });
          return;
      }

// check if the email is already registered in the database and if so return the message
  User.findOne({email})
  .then(userFromDB => {
        if(userFromDB){
        // send the message that user exist and return
        res.render("auth/signup", {
        message: "This email already exists" 
        });
        return;
      }

// if all of the checks have passed we encrypt the password and create a new user
const salt = bcryptjs.genSaltSync(bcryptSalt);
const hashPass = bcryptjs.hashSync(password, salt);

const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPass
});

// save new user to the database and then set his session
newUser
    .save()
    .then(newlyCreatedUser => {
        // we will automatically sign in the user after they sign up so that they do not have to later go to login screen after the signup
        req.session.user = newlyCreatedUser;
        res.redirect("/profile");
    })
    .catch(err => {
        console.log(err);

        // if there was an error we will render the same page the user is on and this time pass a variable that can be used there. In this case it will be a message to display the error
        res.render("auth/signup", { message: "Something went wrong" });
    });
  });
});


// SIGN UP ROUTE FROM NEW CODE
// router.get("/signup", (req, res, next) => {
//   res.render("auth/signup");
// });

// router.post("/signup", (req, res, next) => {

//     const { firstName, lastName, email, password } = req.body;
 

//   // make sure that we have both of the fields as nonempty characters // it is not a bad idea for this to also be done on the frontend
//   if (firstName === "" || lastName === "" || email === "" || password === "") {
//       res.render("auth/signup", {
//         message: "All fields are mandatory!"
//       });
//       return;
//   }

//   // check if the email is already registered in the database and if so return the message
//   User.findOne({email})
//   .then(userFromDB => {
//         if(userFromDB){
//         // send the message that user exist and return
//         res.render("auth/signup", {
//         message: "This email already exists" 
//         });
//         return;
//       }
      
// // if all of the checks have passed we encrypt the password and create a new user
//     const salt = bcryptjs.genSaltSync(bcryptSalt);
//     const hashPass = bcryptjs.hashSync(password, salt);

//       User.create({ firstName, lastName, email, password: hashPass })
//       .then(newUser =>{
//           req.session.user = newUser;
//           res.redirect("/profile");
//         })
//         .catch(err => next(err))
        
//   })
//   .catch(err => next(err))
// });

// LOGOUT

router.get("/logout", (req, res) => {
  // when using passport we can log the user out by calling req.logout(). Since we are not using passport we have to call req.session.destroy() in order to kill the session and remove the data it is currently storing.
  // req.logout();
  console.log("user succesfully logged out")
  req.session.destroy();
  res.redirect("/");
});

// PROFILE ROUTE

router.get('/profile', (req, res) => res.render('users/user-profile.hbs'))

// GOOGLE LOGIN

router.get("/google-login", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/calendar.events.readonly",
            "https://www.googleapis.com/auth/calendar.readonly",
            "https://www.googleapis.com/auth/calendar.settings.readonly"
        ]
  }));

  router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "/profile",
    successMessage: 'Google login successful!',
    failureRedirect: "/login",
    failureMessage: 'Google login failed. Please try to login manually.'
  }));

module.exports = router;
