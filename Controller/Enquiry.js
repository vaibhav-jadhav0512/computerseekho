const express = require('express');
const Enquiry = require('../models/Enquiry');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
var async = require("async");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

module.exports = {

    async getAllEnquiry(req, res) {
        await Enquiry.find().populate("CourseId.course","StaffId.staff").exec((error, Enquiry) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all enquiry..!!'
                });
            }

            if (!Enquiry) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Enquiry not found..!!'
                });
            }

            for (let i = 0; i < Enquiry.length; i++) {
                Enquiry[i].createdAt = Enquiry[i].updatedAt = Enquiry[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(Enquiry);
        });
    },


    //Add enquiry into database
    async CreateEnquiry(req, res) {

        var schema = Joi.object().keys({
            Email: Joi.string().min(3).max(32).required(),
            Name: Joi.string().min(3).max(32).required(),
            Address: Joi.string().min(3).max(300).required(),
            Date: Joi.date(),
            EnquiryProcessflag: Joi.boolean(),
            Mobile: Joi.number().required(),
            AlternateMobile: Joi.number(),
            CourseId: Joi.object().required(),
            ClosureReasonId: Joi.object(),
            StaffId: Joi.object(),
            EnquirerQuery: Joi.string().min(3).max(320).required(),
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        enquiry = new Enquiry(req.body);

        await enquiry.save((error, enquiry) => {
            if (error || !enquiry) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save enquiry..!!'
                });
            }
            let enquiryToSendEmail = enquiry;

            if (enquiryToSendEmail) {
                async.waterfall([
                    function(enquiry) {
                        let transporter = nodemailer.createTransport(smtpTransport({
                            service: "gmail",
                            host: "smtp.gmail.com",
                            auth: {
                                user: "computerseekhoproject@gmail.com",
                                pass: "Computerseekho@88"
                            }
                       }));
                       
                        var mailOptions = {
                            to: enquiryToSendEmail.Email,
                            from: 'computerseekhoproject@gmail.com',
                            subject: 'Computerseekho response to your Enquiry',
                            html: "<h4>Hello " + enquiryToSendEmail.Name + "</h4><h1>Thank You..!!</h1><h3>Our team reach out to u asap..</h3><br><br><h5>Regards</h5><p>Team Computerseekho</p>"
                        };
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log("Email sent: " + info.response);
                            }
                       
                        });
                    }
                ], function(err) {
                    if (err) {
                        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                            error: "Failed to send mail"
                        });
                    }
                });
            }

            enquiry.createdAt = enquiry.updatedAt = enquiry.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Enquiry Saved..!!',
                enquiry: enquiry
            });
        });
    },

    // delete enquiry
    async DeleteEnquiryById(req, res) {
        if (req.enquiry.Name) {
            await Enquiry.deleteOne({ _id: req.enquiry._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting enquiry..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete enquiry..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Enquiry deleted successfully..!!'
                });
            });
        }
    },

    //Update enquiry
    async updateEnquiry(req, res) {

        await Enquiry.findByIdAndUpdate(
            { _id: req.enquiry._id },
            {
                $set: {
                    EnquiryProcessflag: req.body.EnquiryProcessflag
                }
            },
            { new: true },
            (error, enquiry) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating enquiry..!!'
                    });
                }

                if (!enquiry) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'enquiry not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'enquiry updated successfully..!!',
                    enquiry: enquiry
                });
            }
        );

    },

    //Getting enquiry by "Id"
    async EnquiryByID(req, res, next, Id) {
        await Enquiry.findById(Id).exec((error, enquiry) => {
            req.enquiry = enquiry;
            next();
        });
    },

    async getEnquiryById(req, res) {
        if (req.enquiry) {
            return res.json(req.enquiry);
        }
    },


};

