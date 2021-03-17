const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router();
const Joi = require('@hapi/joi');
const helpers = require('../Helpers/helpers');
const HttpStatus = require('http-status-codes');

module.exports = {

     //Fetch Payment data
     async GetAllPayment(req, res) {
        await Payment.find().exec((error, payment) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all payment..!!'
                });
            }

            if (!payment) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'payment not found..!!'
                });
            }

            for (let i = 0; i < payment.length; i++) {
                payment[i].createdAt = payment[i].updatedAt = payment[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(payment);
        });
    },

    // Add FollowUp into database
    async CreatePayment(req, res) {
        var schema = Joi.object().keys({
            IsPaymentDone: true || false,
            IsPaymentReceiptSent: true || false
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

  

        var payment = await Payment.findOne({
            _id: req.body._id
        });
        if (payment) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'payment already exist..!!'
            });
        }

        payment = new Payment(req.body);

        await payment.save((error, payment) => {
            if (error || !payment) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save payment..!!'
                });
            }

            payment.createdAt = payment.updatedAt = payment.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'payment Saved..!!',
                payment: payment
            });
        });
    },


    // delete payment
    async DeletePaymentById(req, res) {
        if (req.Payment._id) {
            await Payment.deleteOne({ _id: req.Payment._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Payment..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Payment..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Payment deleted successfully..!!'
                });
            });
        }
    },

    // Update Payment
    async UpdatePaymentById(req, res) {

        await Payment.findByIdAndUpdate(
            { _id: req.Payment._id },
            {
                $set: {
                    IsPaymentDone: req.body.IsPaymentDone,
                    IsPaymentReceiptSent:req.body.IsPaymentReceiptSent
                }
            },
            { new: true },
            (error, Payment) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Payment..!!'
                    });
                }

                if (!Payment) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Payment not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Payment updated successfully..!!',
                    Payment: Payment
                });
            }
        );
    },

    //Getting Payment by "Id"
    async PaymentByID(req, res, next, Id) {
        await Payment.findById(Id).exec((error, Payment) => {
            req.Payment = Payment;
            next();
        });
    },

    async getPaymentById(req, res) {
        if (req.Payment) {
            return res.json(req.Payment);
        }
    },

}
