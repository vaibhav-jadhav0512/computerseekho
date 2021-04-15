const express = require('express');
const Video = require('../Controller/Video');
const router = express.Router();
const upload=require("../helpers/multer");

// PARAMS
// router.param('videoid', Video.VideoByID);

// ROUTES

// Create
router.post('/addvideo',upload.single('video'),Video.addVideo); 

// Read 
router.get('/video', Video.getallVideo);
router.get('/video/:videoId', Video.getVideoById);

// Update
// router.put('/updatevideo/:videoid', Video.UpdateVideoById);

// Delete
router.delete('/deletevideo/:videoid',Video.DeleteVideoById);


module.exports = router;
