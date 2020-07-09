
let express = require('express')
let db = require('../models')
let router = express.Router()
let cloudinary = require('cloudinary')
var multer = require('multer');
var upload = multer({ dest: './uploads/' });




 // POST PICTURES api and form is on the ejs to submit
router.post('/profile', upload.single('inputFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    var cloudID = result.public_id;
    console.log(cloudID);
    var image = "https://res.cloudinary.com/dekzk3kd1/image/upload/v1593115518/" + cloudID + ".jpg";
    console.log(image);
    res.render('image', { image: image });
  });
    });

    // PERSIST IMAGE
    // Persist Image  ----- npm run create -npm i pg ---- npm i make-runnable --- 
    //require("make-runnable");
    //const db = require('services/dbConnect.js');
//-------------------------------------
    // .then((image) => {
    //   db.pool.connect((err, client) => {
    //     // inset query to run if the upload to cloudinary is successful
    //     const insertQuery = 'INSERT INTO images (title, cloudinary_id, image_url) 
    //        VALUES($1,$2,$3) RETURNING *';
    //     const values = [data.title, image.public_id, image.secure_url];
    //   })
    // })
// execute query ----------
// client.query(insertQuery, values)
//       .then((result) => {
//         result = result.rows[0];

        // send success response ---------
      //   response.status(201).send({
      //     status: "success",
      //     data: {
      //       message: "Image Uploaded Successfully",
      //       title: result.title,
      //       cloudinary_id: result.cloudinary_id,
      //       image_url: result.image_url,
      //     },
      //   })
      // }).catch((e) => {
      //   response.status(500).send({
      //     message: "failure",
      //     e,
      //   });
//       // })

// // 2) Retrive Image
// app.get("/retrieve-image/:cloudinary_id", (request, response) => {
//   // data from user
//   const { cloudinary_id } = request.params;

// });

module.exports = router