
const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema;

const PaymentMasterSchema = mongoose.Schema({
   
    // Id: [{
    //     student: {
    //         type: ObjectId,
    //         ref: "student"
    //     }
    // }],

    // Id: [{
    //     batch: {
    //         type: ObjectId,
    //         ref: "Batch"
    //     }
    // }],

    CourseFees: {
        type: Number,
        minlength: 3,
        maxlength: 10,
        trim: true
    },


    },{ timestamps: true });


    module.exports= mongoose.model('PaymentMaster',PaymentMasterSchema);