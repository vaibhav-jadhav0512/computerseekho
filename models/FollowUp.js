const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const FollowUpSchema = mongoose.Schema({
    
    // Id: [{
    //     enquiry: {
    //         type: ObjectId,
    //         ref: "Enquiry"
    //     }
    // }],

    // Id: [{
    //     staff: {
    //         type: ObjectId,
    //         ref: "Staff"
    //     }
    // }],

    // Id: [{
    //     followupmessage: {
    //         type: ObjectId,
    //         ref: "Staff"
    //     }
    // }],

    FollowUpIsSuccess:{
        type:Boolean,
        default: true
    },

   
    IsActive:{
        type:Boolean,
        default: true
    },
    },{ timestamps: true });


    module.exports= mongoose.model('FollowUp',FollowUpSchema);