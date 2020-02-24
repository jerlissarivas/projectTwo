const express = require('express');
const router  = express.Router();

const Contact = require('../models/Contact.model');

/* GET home page */
router.get('/contacts', (req, res, next) => {
  Contact.find()
  .then(contactsFromDB => {
  res.render('contacts/contacts', {contacts: contactsFromDB});
  })
  .catch(err => {
    console.log(`Error while getting contact from the DB: ${err}`);
    next(err);
  });
});

router.get('/addcontact', (req, res, next) => {
  res.render('contacts/new-contact');
});

router.post('/addcontact', (req, res, next) => {
  // console.log(req.body);
  Contact.create(req.body)
    .then(newContact => {
      // console.log('saved contact is: ', newContact);
      res.redirect('/contacts'); // --> redirect to the page that will show us the list of contacts
    })
    .catch(err => {
      console.log(`Error while saving contact in the DB: ${err}`);
      next(err);
    });
});

router.get('/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    // .populate('cast')
    .then(contactDetails => {
      res.render('contacts/contact-details', {
        details: contactDetails
      });
    })
    .catch(err => {
      console.log(`Error while getting contact details from the DB: ${err}`);
      next(err);
    });
});

module.exports = router;