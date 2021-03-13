const express = require('express');
const Album = require('../Controller/AlbumController');
const router = express.Router();

router.get('/getalbums',Album.getAllAlbums);
router.get('/:albumId',Album.getSpecificAlbum);
router.post('/addalbum',Album.addAlbum);
router.delete('/:albumId',Album.deleteAlbum);
router.patch('/:albumId',Album.updateAlbum);

module.exports = router;


