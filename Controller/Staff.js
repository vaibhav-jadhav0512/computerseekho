const Staff = require('../models/Staff');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');

module.exports = {
    //Fetch Staffs data
    async GetAllStaffs(req, res) {
        await Staff.find().exec((error, staffs) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all Staffs..!!'
                });
            }

            if (!staffs) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Staffs not found..!!'
                });
            }

            for (let i = 0; i < staffs.length; i++) {
                staffs[i].createdAt = staffs[i].updatedAt = staffs[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(staffs);
        });
    },

    // Add Staff into database
    async CreateStaff(req, res) {
        var schema = Joi.object().keys({
            Name: Joi.string().min(3).max(32).required(),
            Email: Joi.string().required(), 
            Mobile : Joi.number(),
            UserName: Joi.string().min(4).max(32).required(),  
            Password: Joi.string().min(8).max(32).required(),
            PhotoUrl: Joi.string()    
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.Name = helpers.firstUpper(req.body.Name)

        var staff = await Staff.findOne({
            Name: req.body.Name
        });
        if (staff) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Staff already exist..!!'
            });
        }   

        staff = new Staff(req.body);

        await staff.save((error, Staff) => {
            if (error || !staff) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save Staff..!!'
                });
            }

            staff.createdAt = staff.updatedAt = staff.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Staff Saved..!!',
                staff: staff
            });
        });
    },


    // delete Staff
    async DeleteStaffById(req, res) {
        if (req.staff.Name) {
            await Staff.deleteOne({ _id: req.staff._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Staff..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Staff..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Staff deleted successfully..!!'
                });
            });
        }
    },

    // Update Staff
    async UpdateStaffById(req, res) {

        await Staff.findByIdAndUpdate(
            { _id: req.staff._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, staff) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Staff..!!'
                    });
                }

                if (!staff) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Staff not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Staff updated successfully..!!',
                    staff: staff
                });
            }
        );
    },

    //Getting Staff by "Id"
    async StaffByID(req, res, next, Id) {
        await Staff.findById(Id).exec((error, staff) => {
            req.staff = staff;
            next();
        });
    },

    async getStaffById(req, res) {
        if (req.staff) {
            return res.json(req.staff);
        }
    }
}