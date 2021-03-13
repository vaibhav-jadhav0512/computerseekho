const Album = require('../models/Album');



module.exports = {
    
    //Fetch Albums data
    async getAllAlbums(req,res){
        try{
            const album = await Album.find();
            res.json(album);
        }catch(err){
            res.json({message:err});
        }
    },

    //Fetch specific album
    async getSpecificAlbum(req, res){
        try{
            const album = await Album.findById(req.params.albumId);
            res.json(album);
        }catch(err){
            res.json({message:err});
        }
    },

    //Add album into database
    async addAlbum(req,res){
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
   },

   //Delete album
   async deleteAlbum(req, res){
    try{
        const removedAlbum = await Album.deleteOne({_id : req.params.albumId});
        res.json(removedAlbum);
    }catch(err){
        res.json({message:err});
    }
    },

    //Update album
    async updateAlbum(req, res){
        try{
            const updatedVideo = await Video.updateOne(
                {_id : req.params.albumId},
                {$set: {Name : req.body.Name}});
            res.json(updatedVideo);
        }catch(err){
            res.json({message:err});
        }
    }

}