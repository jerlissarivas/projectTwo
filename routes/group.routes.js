const express = require("express");
const router = express.Router();

const Group = require("../models/Group.model");

// DELETE GROUP

router.post("/groups/:id/delete", (req, res, next) => {
  Group.findByIdAndRemove(req.params.id)
    .then((groups) => {
      res.redirect("/groups");
    })
    .catch((err) => {
      console.log(`Error while getting group from the DB: ${err}`);
      next(err);
    });
});

// UPDATE GROUP ROUTE

router.get("/groups/:id/edit", (req, res, next) => {
  console.log("Group info: ", req.body);
  Group.findById(req.params.id)
    .populate("groups")
    .then((groups) => {
      res.render("groups/group-edit", { groupDetails: groups });
    })
    .catch((err) => {
      console.log(`Error while getting groups details from DB: ${err}`);
    });
});

router.post("/groups/:id/edit", (req, res, next) => {
  console.log("Group info: ", req.body);
  Group.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(() => {
      res.redirect("/groups");
    })
    .catch((err) => {
      console.log(`Error while updating group details on DB: ${err}`);
    });
});

// GROUP DETAILS

router.get("/groups/:id", (req, res, next) => {
  Group.findById(req.params.id)
    // .populate('contacts')
    .then((groupDetails) => {
      res.render("groups/group-details", {
        groupDetails: groupDetails,
      });
    })
    .catch((err) => {
      console.log(`Error while getting group details from the DB: ${err}`);
      next(err);
    });
});

// GET GROUPS

router.get("/groups", (req, res, next) => {
  Group.find()
    .then((groupsFromDB) => {
      console.log(groupsFromDB);
      res.render("groups/groups", { groups: groupsFromDB });
    })
    .catch((err) => {
      console.log(`Error while getting groups from the DB: ${err}`);
      next(err);
    });
});

// ADD GROUP

router.get("/addgroup", (req, res, next) => {
  res.render("groups/new-group");
});

router.post("/addgroup", (req, res, next) => {
  // console.log(req.body);
  Group.create(req.body)
    .then((newGroup) => {
      // console.log('saved group is: ', newGroup);
      res.redirect("/groups"); // --> redirect to the page that will show us the list of groups
    })
    .catch((err) => {
      console.log(`Error while saving group in the DB: ${err}`);
      next(err);
    });
});

module.exports = router;
