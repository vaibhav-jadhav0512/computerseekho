
const mongoose = require('mongoose');

const PaymentTypeMasterSchema = mongoose.Schema({
   
    Description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
   
    },{ timestamps: true });


    module.exports= mongoose.model('PaymentTypeMaster',PaymentTypeMasterSchema);