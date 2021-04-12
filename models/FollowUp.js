const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const FollowUpSchema = mongoose.Schema({
    
    // Id: [{
    //     enquiry: {
    //         type: ObjectId,
    //         ref: "Enquiry"
    //     }
    // }],
    FollowUpMsg: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },

    EnquiryId: [{
        enquiry: {
            type: ObjectId,
            ref: "Enquiry"
        }
    }],

    StaffId: [{
        staff: {
            type: ObjectId,
            ref: "Staff"
        }
    }],

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