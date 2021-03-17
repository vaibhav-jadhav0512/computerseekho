const Batch = require('../models/Batch');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');


module.exports = {


    //Fetch batches data
    async GetAllBatches(req, res) {
        await Batch.find().exec((error, batches) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all batches..!!'
                });
            }

            if (!batches) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Batches not found..!!'
                });
            }

            for (let i = 0; i < batches.length; i++) {
                batches[i].createdAt = batches[i].updatedAt = batches[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(batches);
        });
    },

    // Add batch into database
    async CreateBatch(req, res) {
        var schema = Joi.object().keys({
            Name: Joi.string().min(2).max(32).required(),
            IsActive: true || false
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.Name = helpers.firstUpper(req.body.Name)

        var batch = await Batch.findOne({
            Name: req.body.Name
        });
        if (batch) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Batch already exist..!!'
            });
        }   

        batch = new Batch(req.body);

        await batch.save((error, batch) => {
            if (error || !batch) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save batch..!!'
                });
            }

            batch.createdAt = batch.updatedAt = batch.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Batch Saved..!!',
                batch: batch
            });
        });
    },


    // delete batch
    async DeleteBatchById(req, res) {
        if (req.batch.Name) {
            await Batch.deleteOne({ _id: req.batch._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting batch..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete batch..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Batch deleted successfully..!!'
                });
            });
        }
    },

    // Update batch
    async UpdateBatchById(req, res) {

        await Batch.findByIdAndUpdate(
            { _id: req.batch._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, batch) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating batch..!!'
                    });
                }

                if (!batch) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'batch not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'batch updated successfully..!!',
                    batch: batch
                });
            }
        );
    },

    //Getting batch by "Id"
    async BatchByID(req, res, next, Id) {
        await Batch.findById(Id).exec((error, batch) => {
            req.batch = batch;
            next();
        });
    },

    async getBatchById(req, res) {
        if (req.batch) {
            return res.json(req.batch);
        }
    },
};

