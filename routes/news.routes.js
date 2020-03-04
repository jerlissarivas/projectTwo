const axios = require("axios");
const express = require('express');
const router = express.Router();

router.get("/profile", (req, res, next) => {
  let url = 'http://newsapi.org/v2/everything?' +
    'q=Apple&' +
    'from=2020-02-29&' +
    'sortBy=popularity&' +
    'apiKey=54546ecca52e4e1698544474ecb7329e';
  axios.get(url)
    .then(data => {
      let articles = data.data.articles
      console.log(data.data.articles)
      res.render('users/user-profile', {
        articles
      })
    })
    .catch(err => {
      console.log(err)
    })
});

module.exports = router;