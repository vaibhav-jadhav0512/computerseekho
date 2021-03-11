const express = require('express');
const Album = require('../models/Album');
const router = express.Router();


//Fetch Students data
router.get('/',async(req,res)=>{
    try{
        const album = await Album.find();
        res.json(album);
    }catch(err){
        res.json({message:err});
    }
});


//Fetch specific student
router.get('/:albumId',async (req, res)=>{
    try{
        const album = await Album.findById(req.params.albumId);
        res.json(album);
    }catch(err){
        res.json({message:err});
    }
});


//Add student into database
router.post('/',async(req,res)=>{
     const album = new Album({
        _id : req.body._id,
        Name : req.body.Name,
        Description : req.body.Description,
        Datte : req.body.Datte,
        NumberofImages : req.body.NumberofImages,
        IsActive : req.body.IsActive
     });
     try{
     const savedAlbum = await album.save();
     res.json(savedAlbum);
     }catch(err){
        res.json({message:err});
     }
});

//Delete student
router.delete('/:albumId',async (req, res)=>{
    try{
        const removedAlbum = await Album.remove({_id : req.params.albumId});
        res.json(removedAlbum);
    }catch(err){
        res.json({message:err});
    }
});

//Update student
router.patch('/:albumId',async (req, res)=>{
    try{
        const updatedVideo = await Video.updateOne(
            {_id : req.params.albumId},
            {$set: {Name : req.body.Name}});
        res.json(updatedVideo);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router;


