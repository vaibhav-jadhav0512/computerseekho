const express = require("express");
const FollowUp = require("../models/FollowUp");
const router = express.Router();
const Joi = require("@hapi/joi");
const helpers = require("../helpers/helpers");
const HttpStatus = require("http-status-codes");

module.exports = {
  //Fetch FollowUp data
  async GetAllFollowUp(req, res) {
    await FollowUp.find()
      .populate("EnquiryId.enquiry", "StaffId.staff")
      .exec((error, followUp) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while getting all followUp..!!",
          });
        }

        if (!followUp) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "followUp not found..!!",
          });
        }

        for (let i = 0; i < followUp.length; i++) {
          followUp[i].createdAt = followUp[i].updatedAt = followUp[
            i
          ].__v = undefined;
        }

        return res.status(HttpStatus.OK).json(followUp);
      });
  },

  // Add FollowUp into database
  async CreateFollowUp(req, res) {
    var schema = Joi.object().keys({
      FollowUpIsSuccess: joi.boolean().required(),
      IsActive: joi.boolean().required(),
      FollowUpMsg: Joi.string().min(2).max(200),
      EnquiryId: Joi.object().required(),
      StaffId: Joi.object(),
    });

    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    var followUp = await FollowUp.findOne({
      _id: req.body._id,
    });
    if (followUp) {
      return res.status(HttpStatus.CONFLICT).json({
        error: "followUp already exist..!!",
      });
    }

    followUp = new FollowUp(req.body);

    await followUp.save((error, followUp) => {
      if (error || !followUp) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
          message: "Unable to save followUp..!!",
        });
      }

      followUp.createdAt = followUp.updatedAt = followUp.__v = undefined;

      return res.status(HttpStatus.OK).json({
        message: "followUp Saved..!!",
        followUp: followUp,
      });
    });
  },

  // delete followUp
  async DeleteFollowUpById(req, res) {
    if (req.FollowUp.IsActive) {
      await FollowUp.deleteOne({ _id: req.FollowUp._id }).exec(
        (error, output) => {
          if (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              error: "Error while deleting followUp..!!",
            });
          }

          if (output.deletedCount != 1) {
            return res.status(HttpStatus.BAD_REQUEST).json({
              error: "Unable to delete followUp..!!",
            });
          }

          return res.status(HttpStatus.OK).json({
            message: "followUp deleted successfully..!!",
          });
        }
      );
    }
  },

  // Update FollowUp
  async UpdateFollowUpById(req, res) {
    await FollowUp.findByIdAndUpdate(
      { _id: req.FollowUp._id },
      {
        $set: {
          IsActive: req.body.IsActive,
        },
      },
      { new: true },
      (error, FollowUp) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while updating FollowUp..!!",
          });
        }

        if (!FollowUp) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "FollowUp not found..!!",
          });
        }

        return res.status(HttpStatus.OK).json({
          message: "FollowUp updated successfully..!!",
          FollowUp: FollowUp,
        });
      }
    );
  },

  //Getting FollowUp by "Id"
  async FollowUpByID(req, res, next, Id) {
    await FollowUp.findById(Id).exec((error, FollowUp) => {
      req.FollowUp = FollowUp;
      next();
    });
  },

  async getFollowUpById(req, res) {
    if (req.FollowUp) {
      return res.json(req.FollowUp);
    }
  },
};
