const Student = require('../models/Student');
const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');
const helpers = require('../helpers/helpers');

module.exports = {

    //Fetch Students data
    async GetAllStudents(req, res) {
        await Student.find().populate("batchId.batch","paymentMasterId.payments").exec((error, students) => {
            if (error) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: 'Error while getting all Students..!!'
                });
            }

            if (!students) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    error: 'Students not found..!!'
                });
            }

            for (let i = 0; i < students.length; i++) {
                students[i].createdAt = students[i].updatedAt = students[i].__v = undefined;
            }

            return res.status(HttpStatus.OK).json(students);
        });
    },

    // Add Student into database
    async CreateStudent(req, res) {
        var schema = Joi.object().keys({
            Name: Joi.string().min(2).max(32).required(),
            Email: Joi.string().required(),
            Address: Joi.string().min(2).max(300).required(),
            Gender: Joi.string().min(4).max(6).required(), 
            Mobile : Joi.number().required(),
            DOB: Joi.date(),
            Age: Joi.number().required(),
            Qualification: Joi.string().min(2).max(20).required(),
            AlternateMobile: Joi.number(),
            IsActive: Joi.boolean(),
            // UserName: Joi.string().min(2).max(32),  
            // Password: Joi.string().min(2).max(32),
            PhotoUrl: Joi.string(),
            batchId: Joi.object(),
            IsEnrolledByEnquiry:Joi.boolean().required(),
            paymentMasterId: Joi.object()    
        });

        const { error, value } = schema.validate(req.body);
        if (error && error.details) {
            return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
        }

        req.body.Name = helpers.firstUpper(req.body.Name)

        var student = await Student.findOne({
            Name: req.body.Name
        });
        if (student) {
            return res.status(HttpStatus.CONFLICT).json({
                error: 'Student already exist..!!'
            });
        }   

        student = new Student(req.body);

        await student.save((error, student) => {
            if (error || !student) {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: error.message,
                    message: 'Unable to save Student..!!'
                });
            }

            student.createdAt = student.updatedAt = student.__v = undefined;

            return res.status(HttpStatus.OK).json({
                message: 'Student Saved..!!',
                student: student
            });
        });
    },


    // delete Student
    async DeleteStudentById(req, res) {
        if (req.student.Name) {
            await Student.deleteOne({ _id: req.student._id }).exec((error, output) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while deleting Student..!!'
                    });
                }

                if (output.deletedCount != 1) {
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        error: 'Unable to delete Student..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Student deleted successfully..!!'
                });
            });
        }
    },

    // Update Student
    async UpdateStudentById(req, res) {

        await Student.findByIdAndUpdate(
            { _id: req.student._id },
            {
                $set: {
                    Name: req.body.Name
                }
            },
            { new: true },
            (error, student) => {
                if (error) {
                    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        error: 'Error while updating Student..!!'
                    });
                }

                if (!student) {
                    return res.status(HttpStatus.NOT_FOUND).json({
                        error: 'Student not found..!!'
                    });
                }

                return res.status(HttpStatus.OK).json({
                    message: 'Student updated successfully..!!',
                    student: student
                });
            }
        );
    },

    //Getting Student by "Id"
    async StudentByID(req, res, next, Id) {
        await Student.findById(Id).exec((error, student) => {
            req.student = student;
            next();
        });
    },

    async getStudentById(req, res) {
        if (req.student) {
            return res.json(req.student);
        }
    }

}