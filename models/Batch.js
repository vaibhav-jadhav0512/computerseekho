const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const BatchSchema = mongoose.Schema(
  {
   
      Name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 32
    },

    StartDate: {
      type: Date,
      required: true
    },

    EndDate: {
      type: Date,
      required: true
    },

    CourseId: [
      {
        course: {
          type: ObjectId,
          ref: "Course", 
          required: true
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
