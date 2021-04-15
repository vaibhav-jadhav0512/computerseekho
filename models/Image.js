
const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    
    Name: {
        type: String,
        required: true,
        trim: true
    },

    avatar:{
        type: String
    },

    cloudinary_id:{
        type:String
    },

    Description: {
        type: String,
        minlength: 3,
        maxlength: 200
    },
    IsActive:{
        type:Boolean,
        default: true
    },
    IsAlbumCover:{
        type:Boolean,
        default: false
    },
    
    },{ timestamps: true });


    module.exports= mongoose.model('Image',ImageSchema);