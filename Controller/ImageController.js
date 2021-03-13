const Image = require('../models/Image');


module.exports = {

    //Fetch Image data
    async getAllImages(req,res){
        try{
            const image = await Image.find();
            res.json(image);
        }catch(err){
            res.json({message:err});
        }
    },

    //Fetch specific Image
    async getSpecificImage (req, res){
        try{
            const image = await Image.findById(req.params.imageId);
            res.json(image);
        }catch(err){
            res.json({message:err});
        }
    },

    //Add Image into database
    async addImage(req,res){
        const image = new Image({
           _id : req.body._id,
           Name : req.body.Name,
           Description : req.body.Description,
           Datte : req.body.Datte,
           NumberofImages : req.body.NumberofImages,
           IsActive : req.body.IsActive,
           ImagePath : req.body.ImagePath,
           IsAlbumCover : req.body.IsAlbumCover
        });
        try{
        const savedImage = await image.save();
        res.json(savedImage);
        }catch(err){
           res.json({message:err});
        }
   },

    //Delete image
   async deleteImage(req, res){
    try{
        const removedImage = await Image.remove({_id : req.params.imageId});
        res.json(removedImage);
    }catch(err){
        res.json({message:err});
    }
    },

    //Update image
    async updateImage (req, res){
        try{
            const updatedImage = await Image.updateOne(
                {_id : req.params.imageId},
                {$set: {Name : req.body.Name}});
            res.json(updatedImage);
        }catch(err){
            res.json({message:err});
        }
    }

}


