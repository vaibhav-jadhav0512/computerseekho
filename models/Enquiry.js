const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EnquirySchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      trim: true,
    },

    Name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      trim: true,
    },

    Address: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },

    Mobile: {
      type: Number,
      minlength: 1,
      maxlength: 10,
      trim: true,
    },

    AlternateMobile: {
      type: Number,
      minlength: 1,
      maxlength: 10,
      trim: true,
    },

    EnquirerQuery: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      trim: true,
    },
    ClosureReason: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      trim: true,
    },
    Date: {
      type: Date,
      default: Date.now,
    },

    CourseId: [
      {
        course: {
          type: ObjectId,
          ref: "Course",
        },
      },
    ],

    StaffId: [
      {
        staff: {
          type: ObjectId,
          ref: "Staff",
        },
      },
    ],

    EnquiryProcessflag: {
      type: Boolean,
      default: true,
      // required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
