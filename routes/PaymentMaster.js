const express =require('express');
const PatmentMasterCtrl = require('../controllers/PaymentMaster');
const router = express.Router();


// PARAMS
router.param('paymentmasterbyid', PatmentMasterCtrl.PaymentMasterByID);

// ROUTES

// Create
router.post('/addpaymentmaster',PatmentMasterCtrl.CreatePaymentMaster);
 
// Read 
router.get('/allpaymentmaster', PatmentMasterCtrl.GetAllPaymentMaster);
router.get('/paymentmaster/:paymentmasterbyid', PatmentMasterCtrl.getPaymentMasterById);

// Update
router.put('/updatepaymentmaster/:paymentmasterbyid', PatmentMasterCtrl.UpdatePaymentMasterById);

// Delete
router.delete('/deletepaymentmaster/:paymentmasterbyid',PatmentMasterCtrl.DeletepaymentMasterById);


module.exports = router;