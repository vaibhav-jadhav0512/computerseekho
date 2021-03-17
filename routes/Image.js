const express = require('express');
const Image = require('../Controller/Image');
const router = express.Router();


router.get('/getimages',Image.getAllImages);
router.get('/:imageId',Image.getSpecificImage);
router.post('/addimage',Image.addImage);
router.delete('/:imageId',Image.deleteImage);
router.patch('/:imageId',Image.updateImage);

module.exports = router;