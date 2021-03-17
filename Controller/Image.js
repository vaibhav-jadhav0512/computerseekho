const Image = require('../models/Image');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');

module.exports = {

    //Fetch Images data
    async GetAllImages(req, res) {
        await Image.find().exec((error, images) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all Images..!!'
                });
            }

            if (!images) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Images not found..!!'
                });
            }

            for (let i = 0; i < images.length; i++) {
                images[i].createdAt = images[i].updatedAt = images[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(images);
        });
    },

    // Add Image into database
    async CreateImage(req, res) {
        var schema = Joi.object().keys({
            Name: Joi.string().min(2).max(32).required(),
            Description: Joi.string().min(2).max(300).required(),
            NumberofImages: Joi.number().required(),
            IsActive: true || false,
            ImagePath: Joi.string().min(2).max(32).required(), 
            IsAlbumCover: false || true 
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.Name = helpers.firstUpper(req.body.Name)

        var image = await Image.findOne({
            Name: req.body.Name
        });
        if (image) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Image already exist..!!'
            });
        }   

        image = new Image(req.body);

        await image.save((error, image) => {
            if (error || !image) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save Image..!!'
                });
            }

            image.createdAt = image.updatedAt = image.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Image Saved..!!',
                image: image
            });
        });
    },


    // delete Image
    async DeleteImageById(req, res) {
        if (req.image.Name) {
            await Image.deleteOne({ _id: req.image._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Image..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Image..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Image deleted successfully..!!'
                });
            });
        }
    },

    // Update Image
    async UpdateImageById(req, res) {

        await Image.findByIdAndUpdate(
            { _id: req.image._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, image) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Image..!!'
                    });
                }

                if (!image) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Image not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Image updated successfully..!!',
                    image: image
                });
            }
        );
    },

    //Getting Image by "Id"
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
    }


}


