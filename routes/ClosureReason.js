const express = require('express');
const ClosureReason = require('../Controller/ClosureReason');
const router = express.Router();

// PARAMS
router.param('closureid', ClosureReason.ClosureReasonByID);

// ROUTES

// Create
router.post('/addclosurereason',ClosureReason.CreateClosureReason);
 
// Read 
router.get('/closurereason', ClosureReason.GetAllClosureReason);
router.get('/closureason/:ClosureReason', ClosureReason.getClosureReasonById);

// Update
router.put('/updateclosurereason/:ClosureReason', ClosureReason.UpdateClosureReasonById);

// Delete
router.delete('/deleteclosurereason/:ClosureReason',ClosureReason.DeleteClosureReasonById);


module.exports = router;


