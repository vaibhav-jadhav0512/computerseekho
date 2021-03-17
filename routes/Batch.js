const express =require('express');
const batchCtrl = require('../controllers/Batch');
const router = express.Router();


// PARAMS
router.param('batchid', batchCtrl.BatchByID);

// ROUTES

// Create
router.post('/addbatch',batchCtrl.CreateBatch);
 
// Read 
router.get('/batches', batchCtrl.GetAllBatches);
router.get('/batch/:batchid', batchCtrl.getBatchById);

// Update
router.put('/updatebatch/:batchid', batchCtrl.UpdateBatchById);

// Delete
router.delete('/deletebatch/:batchid',batchCtrl.DeleteBatchById);


module.exports = router;