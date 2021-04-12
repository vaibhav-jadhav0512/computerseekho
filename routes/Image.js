const express = require('express');
const Image = require('../Controller/Image');
const router = express.Router();
const upload=require("../helpers/multer");


// PARAMS
// router.param('imageid', Image.ImageByID);

// ROUTES

// Create
router.post('/addimage',upload.single('image'),Image.addImage);
 
// Read 
router.get('/images', Image.getallImages);
// router.get('/image/:imageid', Image.getImageById);

// Update
// router.put('/updateimage/:imageid', Image.UpdateImageById);

// Delete
router.delete('/deleteimage/:imageid',Image.DeleteImageById);


module.exports = router;

