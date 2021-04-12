const Image = require('../models/Image');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');
const cloudinary = require("../helpers/cloudinary");
const { image } = require('../helpers/cloudinary');



module.exports = {

    // Add image 
    async addImage(req, res) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);

            //creating image collection in database
            var image = new Image({
                Name: req.body.Name,
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
            });

            await image.save();
            res.json(image);
        }
        catch (err) {
            console.log(err)
        }
    },

    //get image
    async getallImages(req, res) {
        try {
            var image = await Image.find();
            res.json(image);
        } catch (err) {
            console.log(err);
        }

    },

    //Getting batch by "Id"
    async ImageByID(req, res, next, Id) {
        await Image.findById(Id).exec((error, image) => {
            req.image = image;
            next();
        });
    },

    async getImageById(req, res) {
        if (req.image) {
            return res.json(req.image);
        }
    },

    //delete image

    async DeleteImageById(req, res) {
        try {
            //find image by id
            var image = await Image.findById(req.params.public_id);
            //deleting image from cloudinary
            await cloudinary.uploader.destroy(Image.cloudinary_id);
            await image.remove();
            res.json(image);
        } catch (err) {
            console.log(err);
        }
    }
}


