
const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
    
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
    Date: {
        type: Date,
        default: Date.now
    },
    NumberofImages:{
        type:Number,
        default:null,
        required:true
    },
    },{ timestamps: true });


    module.exports= mongoose.model('Album',AlbumSchema);