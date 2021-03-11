const mongoose = require('mongoose');


const StaffSchema = mongoose.Schema({
    _id: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    Email: {
        type: String,
        // required: true,
        trim: true
    },
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    
    
    Mobile :{
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    UserName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },
    
    Password:{
        type: String,
        //required:true,
        maxlength:255,
        minlength:8
    },
    PhotoUrl: {
        type: String,
        trim: true
    },
    Datte: {
        type: Date,
        default: Date.now
    }
    },{ timestamps: true });





    module.exports= mongoose.model('Staff',StaffSchema);