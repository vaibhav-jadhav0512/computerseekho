const express = require('express');
const Album = require('../Controller/Album');
const router = express.Router();

// PARAMS
router.param('albumid', Album.AlbumByID);

// ROUTES

// Create
router.post('/addalbum',Album.CreateAlbum);
 
// Read 
router.get('/albums', Album.GetAllAlbums);
router.get('/album/:albumid', Album.getAlbumById);

// Update
router.put('/updatealbum/:albumid', Album.UpdateAlbumById);

// Delete
router.delete('/deletealbum/:albumid',Album.DeleteAlbumById);


module.exports = router;


