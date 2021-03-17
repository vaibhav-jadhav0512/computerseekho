const Album = require('../models/Album');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');

module.exports = {
    
    //Fetch albums data
    async GetAllAlbums(req, res) {
        await Album.find().exec((error, albums) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all albums..!!'
                });
            }

            if (!albums) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'albums not found..!!'
                });
            }

            for (let i = 0; i < albums.length; i++) {
                albums[i].createdAt = albums[i].updatedAt = albums[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(albums);
        });
    },

    // Add Album into database
    async CreateAlbum(req, res) {
        var schema = Joi.object().keys({
            Name: Joi.string().min(2).max(32).required(),
            Description: Joi.string().min(2).max(300).required(),
            NumberofImages: Joi.number().required(),
            IsActive: true || false
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.Name = helpers.firstUpper(req.body.Name)

        var album = await Album.findOne({
            Name: req.body.Name
        });
        if (album) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Album already exist..!!'
            });
        }   

        album = new Album(req.body);

        await album.save((error, album) => {
            if (error || !album) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save Album..!!'
                });
            }

            album.createdAt = album.updatedAt = album.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Album Saved..!!',
                album: album
            });
        });
    },


    // delete Album
    async DeleteAlbumById(req, res) {
        if (req.album.Name) {
            await Album.deleteOne({ _id: req.album._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Album..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Album..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Album deleted successfully..!!'
                });
            });
        }
    },

    // Update Album
    async UpdateAlbumById(req, res) {

        await Album.findByIdAndUpdate(
            { _id: req.album._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, album) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Album..!!'
                    });
                }

                if (!album) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Album not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Album updated successfully..!!',
                    album: album
                });
            }
        );
    },

    //Getting Album by "Id"
    async AlbumByID(req, res, next, Id) {
        await Album.findById(Id).exec((error, album) => {
            req.album = album;
            next();
        });
    },

    async getAlbumById(req, res) {
        if (req.album) {
            return res.json(req.album);
        }
    }

};