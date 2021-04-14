const Video = require('../models/Video');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');
const cloudinary = require("../helpers/cloudinary");
const { video } = require('../helpers/cloudinary');


module.exports = {

    // Add video 
    async addVideo(req, res) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path,{resource_type: "video"});
            console.log(result)
            //creating video collection in database
            var video = new Video({
                Name: req.body.Name,
                Description:req.body.Description,
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
            });

            await video.save();
            res.json(video);
        }
        catch (err) {
            console.log(err)
        }
    },

    //get video
    async getallVideo(req, res) {
        try {
            var video = await Video.find();
            res.json(video);
        } catch (err) {
            console.log(err);
        }

    },

    //Getting video by "Id"
    async VideoByID(req, res, next, Id) {
        await Video.findById(Id).exec((error, video) => {
            req.video = video;
            next();
        });
    },

    async getVideoById(req, res) {
        if (req.video) {
            return res.json(req.video);
        }
    },

    //delete video

    async DeleteVideoById(req, res) {
        try {
            //find video by id
            var video = await Video.findById(req.params.public_id);
            //deleting video from cloudinary
            await cloudinary.uploader.destroy(Video.cloudinary_id);
            await video.remove();
            res.json(video);
        } catch (err) {
            console.log(err);
        }
    }
}