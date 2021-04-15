
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const PaymentSchema = mongoose.Schema({
   

   
    Date: {
        type: Date,
        default: Date.now
    },

    IsPaymentDone: {
        type: Boolean,
        default: false,
        required: true
    },

    IsPaymentReceiptSent: {
        type: Boolean,
        default: false,
        required:false
    },

    PaymentTypeId: [{
        paymentmaster: {
            type: ObjectId,
            ref: "PaymentTypeMaster",
            required:true
        }
    }],

    StudentId: [{
        student: {
            type: ObjectId,
            ref: "Student",
            required:false
        }
    }],

    BatchId: [{
        batch: {
            type: ObjectId,
            ref: "Batch",
            required:false
        }
    }],

    Amount: {
            type: Number,
            required:true
        },
        
    PaymentTransactionId: {
        type: String,
        required:false
    },
   

   

}, { timestamps: true });


module.exports = mongoose.model('Payment', PaymentSchema);