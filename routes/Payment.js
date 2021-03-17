const express =require('express');
const PatmentCtrl = require('../Controller/Payment');
const router = express.Router();


// PARAMS
router.param('paymentbyid', PatmentCtrl.PaymentByID);

// ROUTES

// Create
router.post('/addpayment',PatmentCtrl.CreatePayment);
 
// Read 
router.get('/allpayment', PatmentCtrl.GetAllPayment);
router.get('/payment/:paymentbyid', PatmentCtrl.getPaymentById);

// Update
router.put('/updatepayment/:paymentbyid', PatmentCtrl.UpdatePaymentById);

// Delete
router.delete('/deletepayment/:paymentbyid',PatmentCtrl.DeletePaymentById);


module.exports = router;