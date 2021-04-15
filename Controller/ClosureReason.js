const ClosureReason = require("../models/ClosureReason");
const HttpStatus = require("http-status-codes");
const Joi = require("@hapi/joi");
const helpers = require("../helpers/helpers");

module.exports = {
  //Fetch Closure data
  async GetAllClosureReason(req, res) {
    await ClosureReason.find()
      .exec((error, closurereason) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while getting all Closure Reasons..!!",
          });
        }

        if (!closurereason) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "Closure reason not found..!!",
          });
        }

        for (let i = 0; i < closurereason.length; i++) {
            closurereason[i].createdAt = closurereason[i].updatedAt = closurereason[
            i
          ].__v = undefined;
        }

        return res.status(HttpStatus.OK).json(closurereason);
      });
  },

  // Add Closure Reason into database
  async CreateClosureReason(req, res) {
    var schema = Joi.object().keys({
      ClosureDescription: Joi.string().min(3).max(200).required()
    });

    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    req.body.ClosureDescription = helpers.firstUpper(req.body.ClosureDescription);

    var closureReason = await ClosureReason.findOne({
        ClosureDescription: req.body.ClosureDescription,
    });
    if (closureReason) {
      return res.status(HttpStatus.CONFLICT).json({
        error: "Closure Reason already exist..!!",
      });
    }

    closurereason = new ClosureReason(req.body);

    await closurereason.save((error, closurereason) => {
      if (error || !closurereason) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
          message: "Unable to save Closure Reason..!!",
        });
      }

      closurereason.createdAt = closurereason.updatedAt = closurereason.__v = undefined;

      return res.status(HttpStatus.OK).json({
        message: "ClosureReason Saved..!!",
        closurereason: closurereason,
      });
    });
  },

  // delete Closure Reason
  async DeleteClosureReasonById(req, res) {
    if (req.ClosureReason.ClosureDescription) {
      await ClosureReason.deleteOne({ _id: req.ClosureReason._id }).exec((error, output) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while deleting closure Reason..!!",
          });
        }

        if (output.deletedCount != 1) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            error: "Unable to delete Closure Reason..!!",
          });
        }

        return res.status(HttpStatus.OK).json({
          message: "Closure Reason deleted successfully..!!",
        });
      });
    }
  },

  // Update Closure reason
  async UpdateClosureReasonById(req, res) {
    await ClosureReason.findByIdAndUpdate(
      { _id: req.ClosureReason._id },
      {
        $set: {
            ClosureDescription: req.body.ClosureDescription,
        },
      },
      { new: true },
      (error, closurereason) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while updating Closure reason..!!",
          });
        }

        if (!closurereason) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "Closure Reason not found..!!",
          });
        }

        return res.status(HttpStatus.OK).json({
          message: "Closure reason updated successfully..!!",
          closurereason: closurereason,
        });
      }
    );
  },

  //Getting Closure reason by "Id"
  async ClosureReasonByID(req, res, next, Id) {
    await ClosureReason.findById(Id).exec((error, closurereason) => {
      req.ClosureReason = closurereason;
      next();
    });
  },

  async getClosureReasonById(req, res) {
    if (req.ClosureReason) {
      return res.json(req.ClosureReason);
    }
  },
};
