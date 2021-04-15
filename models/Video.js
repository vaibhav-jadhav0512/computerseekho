
const mongoose = require('mongoose');
const { string } = require('@hapi/joi');

const VideoSchema = mongoose.Schema({

    Name: {
        type: String,
        required: true,
        trim: true
    },
   
    Description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },

    avatar:{
        type: String
    },

    IsActive:{
        type:Boolean,
        default: true
    },

    cloudinary_id:{
        type:String
    },

    },{ timestamps: true });


    module.exports= mongoose.model('Video',VideoSchema);