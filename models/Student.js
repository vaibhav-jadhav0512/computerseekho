const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const StudentSchema = mongoose.Schema({

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
    Address: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
    },
    Gender: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 6,
        trim: true
    },
    PhotoUrl: {
        type: String,
        trim: true
    },
    DOB: {
        type: Date,
        required: true
    },
    Age: {
        type: Number,
        required: true,
        trim: true
    },
    Qualification: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true
    },
    Mobile :{
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: true,
        trim: true
    },
    AlternateMobile:{
        type: Number,
        minlength: 10,
        maxlength: 10,
        trim: true
    },
    batchId: [{
        batch: {
            type: ObjectId,
            ref: "Batch"
        }
    }],
    paymentMasterId: [{
        payments: {
            type: ObjectId,
            ref: "PaymentMaster"
        }
    }],
    IsActive:{
        type: Boolean,
        default: true,
    },
    IsEnrolledByEnquiry:{
        type: Boolean,
        default: false,
        required: true
    },
    // UserName:{
    //     type: String,
    //     //required:true,
    //     maxlength:255,
    //     minlength:8
    // },
    // Password:{
    //     type: String,
    //     //required:true,
    //     maxlength:255,
    //     minlength:5
    // },
    Date: {
        type: Date,
        default: Date.now
    }
    },{ timestamps: true });





    module.exports = mongoose.model('Students',StudentSchema);