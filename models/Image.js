
const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    ImagePath: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    },
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    Description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    IsActive:{
        type:Boolean,
        default: true
    },
    IsAlbumCover:{
        type:Boolean,
        default: true
    },
    
    NumberofImages:{
        type:Number,
        default:null,
        required:true
    },
    },{ timestamps: true });


    module.exports= mongoose.model('Image',ImageSchema);