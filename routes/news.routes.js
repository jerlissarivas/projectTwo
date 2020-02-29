router.get("/", (req, res, next) => {
  var url = 'http://newsapi.org/v2/everything?' +
         'q=Apple&' +
         'from=2020-02-29&' +
         'sortBy=popularity&' +
         'apiKey=54546ecca52e4e1698544474ecb7329e';
 axios.get(url)
 .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log(err)
  })
});