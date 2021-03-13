const express = require('express');
const Staff = require('../Controller/StaffController');
const router = express.Router();

router.get('/getstaffs',Staff.getAllStaffs);
router.get('/:staffId',Staff.getSpecificStaff);
router.post('/addstaff',Staff.addStaff);
router.delete('/:staffId',Staff.deleteStaff);
router.patch('/:staffId',Staff.updateStaff);

module.exports = router;
