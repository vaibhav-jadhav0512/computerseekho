
const mongoose = require('mongoose');

const PaymentTypeMasterSchema = mongoose.Schema({
   
    PaymentTypeDescription: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
   
    },{ timestamps: true });


    module.exports= mongoose.model('PaymentTypeMaster',PaymentTypeMasterSchema);