// const express = require('express');
// const router  = express.Router();
// const axios = require("axios");


/* GET home page */
// router.get('/', (req, res, next) => {
//   var url = 'http://newsapi.org/v2/everything?' +
//          'q=Apple&' +
//          'from=2020-02-29&' +
//          'sortBy=popularity&' +
//          'apiKey=54546ecca52e4e1698544474ecb7329e';
//  axios.get(url)
//  .then(data => {
//     let articles = data.articles
//     console.log(data.data.articles)
//     res.render('index', {articles})
//   })
//   .catch(err => {
//     console.log(err)
//   })
// });

const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;