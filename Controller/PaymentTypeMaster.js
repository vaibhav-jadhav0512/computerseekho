const express = require('express');
const PaymentMaster = require('../models/PaymentMaster');
const router = express.Router();
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');
const HttpStatus = require('http-status-codes');

module.exports = {

     //Fetch Paymentmaster data
     async GetAllPaymentMaster(req, res) {
        await PaymentMaster.find().exec((error, paymentMaster) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all PaymentMaster..!!'
                });
            }

            if (!paymentMaster) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'paymentMaster not found..!!'
                });
            }

            for (let i = 0; i < paymentMaster.length; i++) {
                paymentMaster[i].createdAt = paymentMaster[i].updatedAt = paymentMaster[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(paymentMaster);
        });
    },

    // Add FollowUp into database
    async CreatePaymentMaster(req, res) {
        var schema = Joi.object().keys({
            CourseFees: Joi.number().required()
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

  

        var paymentMaster = await PaymentMaster.findOne({
            _id: req.body._id
        });
        if (paymentMaster) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'paymentMaster already exist..!!'
            });
        }

        paymentMaster = new PaymentMaster(req.body);

        await paymentMaster.save((error, paymentMaster) => {
            if (error || !paymentMaster) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save paymentMaster..!!'
                });
            }

            paymentMaster.createdAt = paymentMaster.updatedAt = paymentMaster.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'paymentMaster Saved..!!',
                paymentMaster: paymentMaster
            });
        });
    },


    // delete paymentMaster
    async DeletepaymentMasterById(req, res) {
        if (req.PaymentMaster._id) {
            await PaymentMaster.deleteOne({ _id: req.PaymentMaster._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting PaymentMaster..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete PaymentMaster..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'PaymentMaster deleted successfully..!!'
                });
            });
        }
    },

    // Update PaymentMaster
    async UpdatePaymentMasterById(req, res) {

        await PaymentMaster.findByIdAndUpdate(
            { _id: req.PaymentMaster._id },
            {
                $set: {
                    CourseFees: req.body.CourseFees
                }
            },
            { new: true },
            (error, PaymentMaster) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating PaymentMaster..!!'
                    });
                }

                if (!PaymentMaster) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'PaymentMaster not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'PaymentMaster updated successfully..!!',
                    PaymentMaster: PaymentMaster
                });
            }
        );
    },

    //Getting PaymentMaster by "Id"
    async PaymentMasterByID(req, res, next, Id) {
        await PaymentMaster.findById(Id).exec((error, PaymentMaster) => {
            req.PaymentMaster = PaymentMaster;
            next();
        });
    },

    async getPaymentMasterById(req, res) {
        if (req.PaymentMaster) {
            return res.json(req.PaymentMaster);
        }
    },


}; 

