const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const FollowUpSchema = mongoose.Schema({
    


    EnquiryId: [{
        enquiry: {
            type: ObjectId,
            ref: "Enquiry",
            required: true
        },
        
    }],

    StaffId: [{
        staff: {
            type: ObjectId,
            ref: "Staff",
            required: true
        }
    }],

    FollowUpIsSuccess:{
        type:Boolean,
        default: false,
        required:true
    },
    
    FollowUpMsg: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 200
    },

   
    IsActive:{
        type:Boolean,
        default: true,
        required: true
    },
    },{ timestamps: true });


    module.exports= mongoose.model('FollowUp',FollowUpSchema);