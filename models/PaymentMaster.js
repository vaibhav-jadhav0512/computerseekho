
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PaymentMasterSchema = mongoose.Schema({
   
    StudentId: [{
        student: {
            type: ObjectId,
            ref: "student"
        }
    }],

    BatchId: [{
        batch: {
            type: ObjectId,
            ref: "Batch"
        }
    }],

    CourseFees: {
        type: Number,
        minlength: 3,
        maxlength: 10,
        trim: true,
        required: true
    },


    },{ timestamps: true });


    module.exports= mongoose.model('PaymentMaster',PaymentMasterSchema);