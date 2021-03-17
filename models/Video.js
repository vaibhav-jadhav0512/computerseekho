
const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
   
    Description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    Url:{
        type:String,
        required: true
    },

    isActive:{
        type:Boolean,
        default: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
    },{ timestamps: true });


    module.exports= mongoose.model('Video',VideoSchema);