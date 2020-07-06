// 1) Requirments and Use Files -------- // 
let express = require('express');                   //let MapboxClient = require('mapbox');
let ejsLayouts = require('express-ejs-layouts');
let db = require('./models/index2');
let moment = require('moment');
let rowdy = require('rowdy-logger');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
var cloudinary = require('cloudinary');
let app = express()
let request = require('request'),
   geojson = require('geojson'),
  path = require('path');

require('dotenv').config()
rowdy.begin(app)

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)
app.use(express.static(__dirname + '/public/'))



// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

// 2) Define Controllers 
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
app.use('/search', require('./controllers/search'))    

// 3) MAP Requirments and GET the Api key from the env file
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding') 
// 1st require mapbox geocoder API's 
const { response } = require('express')
const geocodingClient = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN})


// TODO   TODO   Get the ISS Tracking on MapBX --------------------------------------------

/* Express application which serves the root route and provides an API to get
   current ISS coordinates in GeoJSON format.
 */
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';  //---------- // THIS IS THE ISS APi
//app.get('/findiss', function(req, res) {
    // request(ISS_URL, function(err, resp, body) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).json({ error: 'Unable to contact ISS API' });
    //         return;
    //     }
    //     var apiResponse = JSON.parse(body);
    //     var issGeoJSON = geojson.parse([apiResponse], { Point: ['latitude', 'longitude'] });

    //     res.json(issGeoJSON);
    // });
// });
// ----------------------------^^^^^^^^^^^^^^^^----------------------------- TO DO NOT WORKING ISS -------^---

// Root Get Route

// 4)  GET / - Map + Image Cloudinary +  display all articles and their authors
app.get('/', (req, res) => {
    geocodingClient.forwardGeocode({
      query: `${req.query.city}, ${req.query.state}` 
    
      // request(ISS_URL, function(err, resp, body) {
      //   if (err) {
      //       console.log(err);
      //       res.status(400).json({ error: 'Unable to contact ISS API' });
      //       return;
      //   }
      //   var apiResponse = JSON.parse(body);
      //   var issGeoJSON = geojson.parse([apiResponse], { Point: ['latitude', 'longitude'] });
    
      //   res.json(issGeoJSON);
      // }
  
      // This is how we search for locations this is query ISS API CALL +DATA QUERRY
    })
.send()
.then(response => {
    let match = response.body.features[0]  // This line connects to line 17 -- no (response.body) here
   //res.render('show', {match, mapkey: process.env.MAPBOX_TOKEN})   // This renders the JSON on the SHOW page
    //res.send(response.body)   -------- This returns all the JSON -- line 16 gets just (body.features)
    db.article.findAll({
      include: [db.author]
    }).then((articles) => {
      res.render('main/index', { articles: articles, match, mapkey: process.env.MAPBOX_TOKEN})
    }).catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })


app.post('/main/index', upload.single('inputFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    var cloudID = result.public_id;
    console.log(cloudID);
    var image = "https://res.cloudinary.com/dekzk3kd1/image/upload/v1593115518/" + cloudID + ".jpg";
    console.log(image);
    res.render('image', { image: image });
  });
});
});





app.listen(process.env.PORT || 4000, console.log('Rootin n Tooting on 4000'))
