
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
        default: true,
        required: true
    },

    StartDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    EndDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    IsDefault: {
        type: Boolean,
        default: false
    },
    NumberofImages:{
        type:Number
    }
    },{ timestamps: true });


    module.exports= mongoose.model('Album',AlbumSchema);