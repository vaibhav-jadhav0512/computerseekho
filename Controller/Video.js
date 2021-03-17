const Video = require('../models/Video');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');


module.exports = {
    //Fetch Videos data
    async GetAllVideos(req, res) {
        await Video.find().exec((error, videos) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all Videos..!!'
                });
            }

            if (!videos) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Videos not found..!!'
                });
            }

            for (let i = 0; i < videos.length; i++) {
                videos[i].createdAt = videos[i].updatedAt = videos[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(videos);
        });
    },

    // Add Video into database
    async CreateVideo(req, res) {
        var schema = Joi.object().keys({
            Description: Joi.string().min(2).max(320).required(),  
            IsActive: Joi.boolean().required(),
            Date: Joi.date().required(),
            Url: Joi.string().min(2).max(32).required()    
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        // req.body.Url = helpers.firstUpper(req.body.Url)

        var video = await Video.findOne({
            Url: req.body.Url
        });
        if (video) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Video already exist..!!'
            });
        }   

        video = new Video(req.body);

        await video.save((error, video) => {
            if (error || !video) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save Video..!!'
                });
            }

            video.createdAt = video.updatedAt = video.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Video Saved..!!',
                video: video
            });
        });
    },


    // delete Video
    async DeleteVideoById(req, res) {
        if (req.video.Name) {
            await Video.deleteOne({ _id: req.video._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Video..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Video..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Video deleted successfully..!!'
                });
            });
        }
    },

    // Update Video
    async UpdateVideoById(req, res) {

        await Video.findByIdAndUpdate(
            { _id: req.video._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, video) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Video..!!'
                    });
                }

                if (!video) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Video not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Video updated successfully..!!',
                    video: video
                });
            }
        );
    },

    //Getting Video by "Id"
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
    }
}