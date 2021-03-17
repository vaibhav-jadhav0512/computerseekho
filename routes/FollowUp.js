const express =require('express');
const FollowUpCtrl = require('../Controller/FollowUp');
const router = express.Router();


// PARAMS
router.param('followupbyid', FollowUpCtrl.FollowUpByID);

// ROUTES

// Create
router.post('/addfollowup',FollowUpCtrl.CreateFollowUp);
 
// Read 
router.get('/allfollowup', FollowUpCtrl.GetAllFollowUp);
router.get('/followup/:followupbyid', FollowUpCtrl.getFollowUpById);

// Update
router.put('/updatefollowup/:followupbyid', FollowUpCtrl.UpdateFollowUpById);

// Delete
router.delete('/deletefollowup/:followupbyid',FollowUpCtrl.DeleteFollowUpById);


module.exports = router;