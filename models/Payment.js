
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PaymentSchema = mongoose.Schema({
   

    // paymenttypeId: {
    //     type: ObjectId,
    //     ref: "PaymentTypeMaster"
    // },

    // Id: [{
    //     paymenttransactionId: {
    //         type: ObjectId,
    //         ref: "PaymentTypeMaster"
    //     }
    // }],

    Date: {
        type: Date,
        default: Date.now
    },

    IsPaymentDone: {
        type: Boolean,
        default: false
    },

    IsPaymentReceiptSent: {
        type: Boolean,
        default: false
    },

    // Id: [{
    //     paymentMasterId: {
    //         type: ObjectId,
    //         ref: "PaymentTypeMaster"
    //     }
    // }],

    // student: {
    //     type: ObjectId,
    //     ref: "student"
    // },

    // batch: {
    //     type: ObjectId,
    //     ref: "Batch"
    // },

}, { timestamps: true });


module.exports = mongoose.model('Payment', PaymentSchema);