const Video = require('../models/Video');



module.exports = {
    //Fetch Video data
    async getAllVideos(req,res){
        try{
            const video = await Video.find();
            res.json(video);   //Ask this
        }catch(err){
            res.json({message:err});
        }
    },

    //Fetch specific video
    async getSpecificVideo(req, res){
        try{
            const video = await Video.findById(req.params.videoId);
            res.json(video);
        }catch(err){
            res.json({message:err});
        }
    },

    //Add video into database
    async addVideo(req,res){
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
    },

    //Delete video
    async deleteVideo(req, res){
        try{
            const removedVideo = await Video.remove({_id : req.params.videoId});
            res.json(removedVideo);
        }catch(err){
            res.json({message:err});
        }
    }
}