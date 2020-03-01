const axios = require("axios");
const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  let url = 'http://newsapi.org/v2/everything?' +
         'q=Apple&' +
         'from=2020-02-29&' +
         'sortBy=popularity&' +
         'apiKey=54546ecca52e4e1698544474ecb7329e';
 axios.get(url)
 .then(data => {
    let articles = data.articles
    console.log(data.data.articles)
    res.render('index', {articles})
  })
  .catch(err => {
    console.log(err)
  })
});

module.exports = router;