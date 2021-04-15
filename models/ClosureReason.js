const mongoose = require("mongoose");

const ClosureReasonSchema = new mongoose.Schema(
  { 
    ClosureDescription:
     {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
      trim: true
    }
  },
  { timestamps: true }

);

module.exports = mongoose.model("ClosureReason", ClosureReasonSchema);
