const express =require('express');

const paymentTypeMasterCtrl = require('../Controller/PaymentTypeMaster');

const router = express.Router();


router.get('/allPaymentTypeMaster',paymentTypeMasterCtrl.getAllPaymentTypeMaster);
router.get('/PaymentTypeMaster',paymentTypeMasterCtrl.getPaymentTypeMaster);
router.post('/addPaymentTypeMaster',paymentTypeMasterCtrl.post);
router.delete('/deletePaymentTypeMaster',paymentTypeMasterCtrl.delete);
router.patch('/updatePaymentTypeMaster',paymentTypeMasterCtrl.patch);


module.exports = router;