const express = require('express');
const Video = require('../Controller/VideoController');
const router = express.Router();

router.get('/getvideos',Video.getAllVideos);
router.get('/:videoId',Video.getSpecificVideo);
router.post('/addvideo',Video.addVideo);
router.delete('/:videoId',Video.deleteVideo);


module.exports = router;