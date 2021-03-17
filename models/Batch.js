
const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const BatchSchema = mongoose.Schema({
    
    Name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
        trim: true
    },

    // Id: [{
    //     course: {
    //         type: ObjectId,
    //         ref: "Course"
    //     }
    // }],
     
    IsActive:{
        type:Boolean,
        default: true
    },

    Date: {
        type: Date,
        default: Date.now
    },
   
    },{ timestamps: true });


    module.exports= mongoose.model('Batch',BatchSchema);