const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const EnquirySchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      trim: true
    },

    Name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      trim: true
    },

    Address: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true
    },

    Mobile: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      trim: true
    },

    AlternateMobile: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      trim: true
    },

    EnquirerQuery: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      trim: true
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
          required: true
        },
      },
    ],

    ClosureReasonId: [
      {
        closureReason: {
          type: ObjectId,
          ref: "ClosureReason",
          required: false
        },
      },
    ],

    StaffId: [
      {
        staff: {
          type: ObjectId,
          ref: "Staff",
          required: false
        },
        
      },
      
    ],

    EnquiryProcessflag: {
      type: Boolean,
      default: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
