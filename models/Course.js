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
      maxlength: 500,
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
      type: [
        {
          topic: String,
          topic_desc: String,
        },
      ],
      required:true
    },
    AgeGroupType: {
      type: Array,
      required: true
    },
    EnquiryCounter: {
      type: Number,
      // required: true
    },
    IsActive: {
      type: Boolean,
      default: true,
      //required: true
    },
    CoverPhoto: {
      type: String,
      //required: true,
      minlength: 3,
      maxlength: 50,
    },
    VideoId: [
      {
        video: {
          type: ObjectId,
          ref: "Video",
        },
        required: false
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
