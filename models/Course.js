const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CourseSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
    },
    Duration: {
      type: Number,
      required: true,
    },
    Fees: {
      type: Number,
      required: true,
    },
    Syllabus: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 300,
    },
    AgeGroupType: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    EnquiryCounter: {
      type: Number,
      required: true,
    },
    IsActive: {
      type: Boolean,
      default: true,
      //required: true
    },
    CoverPhoto: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    VideoId: [
      {
        video: {
          type: ObjectId,
          ref: "Video",
        },
      },
    ],
    Date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
