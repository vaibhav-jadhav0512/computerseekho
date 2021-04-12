const express =require('express');
const enquiryCtrl = require('../Controller/Enquiry');
const router = express.Router();



// PARAMS
router.param('enquiryid', enquiryCtrl.EnquiryByID);

// ROUTES

// Create
router.post('/addenquiry', enquiryCtrl.CreateEnquiry);

// Read
router.get('/enquiries',  enquiryCtrl.getAllEnquiry);
router.get('/enquiry/:enquiryid', enquiryCtrl.getEnquiryById);

// Update
router.put('/updateenquiry/:enquiryid', enquiryCtrl.updateEnquiry);

// Delete
router.delete('/deleteenquiry/:enquiryid', enquiryCtrl.DeleteEnquiryById);




module.exports = router;