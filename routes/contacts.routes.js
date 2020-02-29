const express = require('express');
const router  = express.Router();

const Contact = require('../models/Contact.model');

// DELETE CONTACT

router.post('/contacts/:id/delete', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(contact => {
    res.redirect('/contacts');
  })
  .catch(err => {
    console.log(`Error while getting contact from the DB: ${err}`);
    next(err);
  });
})


// UPDATE CONTACTS ROUTE

router.get('/contacts/:id/edit', (req, res, next) => {
  console.log("Contact info: ", req.body);
  Contact.findById(req.params.id)
  .populate('contacts')
  .then(contacts => {
      res.render('contacts/contact-edit', {details: contacts})
  })
  .catch(err => {
      console.log(`Error while getting contact details from DB: ${err}`);
  });
});

router.post('/contacts/:id/edit', (req, res, next) => {
  console.log("Contact info: ", req.body);
  Contact.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
  .then(() => {
    res.redirect('/contacts');
  })
  .catch(err => {
      console.log(`Error while updating contact details on DB: ${err}`)
  });
});

// Contact Details 

router.get('/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
  // .populate('contacts')
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

// Get Contacts 

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

// Add Contacts

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

// Update Contacts 

// router.get('/contacts/:id/edit', (req, res) => {
//   Contact.findById(req.params.id)
//     .populate('contacts')
//     .then(foundContacts => {
//       console.log('contact:', foundContacts);
//       res.render('contacts/contact-edit', { foundContacts: contacts });
//       })
//     .catch(err => console.log(`Err while getting the contacts from the  DB for the update: ${err}`));
// });



module.exports = router;