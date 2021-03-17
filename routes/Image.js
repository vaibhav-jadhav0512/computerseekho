const express = require('express');
const Image = require('../Controller/Image');
const router = express.Router();



// PARAMS
router.param('imageid', Image.ImageByID);

// ROUTES

// Create
router.post('/addimage',Image.CreateImage);
 
// Read 
router.get('/images', Image.GetAllImages);
router.get('/image/:imageid', Image.getImageById);

// Update
router.put('/updateimage/:imageid', Image.UpdateImageById);

// Delete
router.delete('/deleteimage/:imageid',Image.DeleteImageById);


module.exports = router;

