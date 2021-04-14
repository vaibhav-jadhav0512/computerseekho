const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BatchSchema = mongoose.Schema(
  {
    BatchId:{
      type:Number,
       default: 0
    }
    ,   
         Name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
      trim: true
    },

    StartDate: {
      type: Date
    },

    EndDate: {
      type: Date
    },

    CourseId: [
      {
        course: {
          type: ObjectId,
          ref: "Course"
        },
      }
    ],

    FinalPresentationDate: {
      type: Date
    },

    IsActive: {
      type: Boolean,
      default: true
    },

    Date: {
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Batch", BatchSchema);
