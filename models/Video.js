
const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    _id: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    
    Description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    URL:{
        type:String,
        required: true
    },

    isActive:{
        type:Boolean,
        default: true
    },
    Datte: {
        type: Date,
        default: Date.now
    }
    },{ timestamps: true });


    module.exports= mongoose.model('Video',VideoSchema);