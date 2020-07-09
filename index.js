// 1)  Required NPM libraries
require('dotenv').config();
const Express = require('express');
const ejsLayouts = require("express-ejs-layouts");
const helmet = require('helmet');
const session = require("express-session");
const flash = require("flash");
const passport = require('./config/ppConfig');
const db = require('./models/index');
var cloudinary = require('cloudinary');
let moment = require('moment');
let rowdy = require('rowdy-logger');
var multer = require('multer');
var upload = multer({ dest: './uploads/' });
const isLoggedIn = require('./middleware/isLoggedIn');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
let request = require('request')
let icon = require('ionicons')
const axios = require('axios')
   geojson = require('geojson')
  path = require('path');
  require('dotenv').config()
// rowdy.begin(app)

// app use items 

const app = Express();
app.use(Express.urlencoded({ extended: false }));
app.use(Express.static(__dirname + '/public'));
app.use(ejsLayouts);
app.set('view engine','ejs');
app.use(require('morgan')('dev'));
app.use(helmet());



// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
    res.locals.moment = moment
    next()
  })
// create new instance of class Sequelize Store
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}))

sessionStore.sync();
// initialize passport and session info
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req, res, next) {
    res.locals.alert  = req.flash();
    res.locals.currentUser = req.user;

    next();
});

// 2) Define Controllers 
app.use('/auth', require('./controllers/auth'));
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
 app.use('/profile', require('./controllers/profile'))   


// ROUTES ----AUTHENTICATION This Code must be under app.use req.flash
app.get('/', function(req, res) {
    // check to see if user logged in
    res.render('index');
})

app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile');
    //res.render('main/index', { articles: articles, match, mapkey: process.env.MAPBOX_TOKEN})

})


// 3) MAP Requirments and GET the Api key from the env file
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding') 
// 1st require mapbox geocoder API's 
const { response } = require('express')
const geocodingClient = mbxGeocoding({accessToken: process.env.MAPBOX_TOKEN})



/* Express application which serves the root route and provides an API to get
   current ISS coordinates in GeoJSON format.
 */
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544'; 
app.get('/findiss', function(req, res) {
    request(ISS_URL, function(err, resp, body) {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Unable to contact ISS API' });
            return;
        }
        var apiResponse = JSON.parse(body);
        var issGeoJSON = geojson.parse([apiResponse], { Point: ['latitude', 'longitude'] });

        res.json(issGeoJSON);
    });
});

// 4)  GET / - Root Get route for Map + Image + display all articles and their authors
app.get('/main', (req, res) => {
      axios.get(ISS_URL, function(err, resp, body) {
        if (err) {
            console.log(err);
            res.status(400).json({ error: 'Unable to contact ISS API' });
            return;
      }
        var apiResponse = JSON.parse(body);
        var issGeoJSON = geojson.parse([apiResponse], { Point: ['latitude', 'longitude'] });
        console.log('Inside axios call');
        // res.json(issGeoJSON);
      })
.then(response => {
    let match = response.data
    console.log('Inside Response', match)
   //res.render('show', {match, mapkey: process.env.MAPBOX_TOKEN})   // This renders the JSON on the SHOW page
    //res.send(response.body)   
    db.article.findAll({
      include: [db.author]
    }).then((articles) => {
      res.render('main/index', { articles: articles, match, mapkey: process.env.MAPBOX_TOKEN})
    }).catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })
});




// initialize App on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening to the smooth sweet sounds of port ${process.env.PORT} in the morning 🦊.`);
});


