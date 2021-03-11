const express = require('express');
const Video = require('../models/Video');
const router = express.Router();


//Fetch Video data
router.get('/',async(req,res)=>{
    try{
        const video = await Video.find();
        res.json(video);   //Ask this
    }catch(err){
        res.json({message:err});
    }
});


//Fetch specific video
router.get('/:videoId',async (req, res)=>{
    try{
        const video = await Video.findById(req.params.videoId);
        res.json(video); //  this has to be asked
    }catch(err){
        res.json({message:err});
    }
});


//Add video into database
router.post('/',async(req,res)=>{
    const video = new Video({
        _id:req.body._id,
        Description:req.body.Description,
        URL:req.body.URL,
        isActive:req.body.isActive,
        Datte:req.body.Datte
    });
    try{
        const savedVideo = await video.save();
        res.json(savedVideo);
        }catch(err){
           res.json({message:err});
        }
});

//Delete video
router.delete('/:videoId',async (req, res)=>{
    try{
        const removedVideo = await Video.remove({_id : req.params.videoId});
        res.json(removedVideo);
    }catch(err){
        res.json({message:err});
    }
});





module.exports = router;


