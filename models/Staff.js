const mongoose = require("mongoose");

const StaffSchema = mongoose.Schema(
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
      maxlength: 32,
      trim: true,
    },

    Mobile: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      trim: true,
    },
    UserName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 32,
      trim: true,
    },

    PhotoUrl: {
      type: String,
      trim: true,
    },
    
    Date: {
        type: Date,
        default: Date.now,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);
