const express = require('express');
const Video = require('../Controller/Video');
const router = express.Router();
// PARAMS
router.param('videoid', Video.VideoByID);

// ROUTES

// Create
router.post('/addvideo',Video.CreateVideo);
 
// Read 
router.get('/videos', Video.GetAllVideos);
router.get('/video/:videoid', Video.getVideoById);

// Update
router.put('/updatevideo/:videoid', Video.UpdateVideoById);

// Delete
router.delete('/deletevideo/:videoid',Video.DeleteVideoById);


module.exports = router;