const Course = require("../models/Course");
const HttpStatus = require("http-status-codes");
const Joi = require("@hapi/joi");
const helpers = require("../helpers/helpers");

module.exports = {
  //Fetch Courses data
  async GetAllCourses(req, res) {
    await Course.find()
      .populate("VideoId.video")
      .exec((error, courses) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while getting all Courses..!!",
          });
        }

        if (!courses) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "Courses not found..!!",
          });
        }

        for (let i = 0; i < courses.length; i++) {
          courses[i].createdAt = courses[i].updatedAt = courses[
            i
          ].__v = undefined;
        }

        return res.status(HttpStatus.OK).json(courses);
      });
  },

  // Add Course into database
  async CreateCourse(req, res) {
    var schema = Joi.object().keys({
      Name: Joi.string().min(2).max(32).required(),
      Description: Joi.string().min(2).required(),
      Duration: Joi.number().required(),
      Fees: Joi.number().required(),
      Syllabus: Joi.required(),
      AgeGroupType: Joi.string().min(2).max(10).required(),
      EnquiryCounter: Joi.number().required(),
      IsActive: true || false,
      CoverPhoto: Joi.string().min(2).max(32).required(),
      // VideoId: Joi.required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    req.body.Name = helpers.firstUpper(req.body.Name);

    var course = await Course.findOne({
      Name: req.body.Name,
    });
    if (course) {
      return res.status(HttpStatus.CONFLICT).json({
        error: "Course already exist..!!",
      });
    }

    course = new Course(req.body);

    await course.save((error, course) => {
      if (error || !course) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          error: error.message,
          message: "Unable to save Course..!!",
        });
      }

      course.createdAt = course.updatedAt = course.__v = undefined;

      return res.status(HttpStatus.OK).json({
        message: "Course Saved..!!",
        course: course,
      });
    });
  },

  // delete Course
  async DeleteCourseById(req, res) {
    if (req.course.Name) {
      await Course.deleteOne({ _id: req.course._id }).exec((error, output) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while deleting Course..!!",
          });
        }

        if (output.deletedCount != 1) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            error: "Unable to delete Course..!!",
          });
        }

        return res.status(HttpStatus.OK).json({
          message: "Course deleted successfully..!!",
        });
      });
    }
  },

  // Update Course
  async UpdateCourseById(req, res) {
    await Course.findByIdAndUpdate(
      { _id: req.course._id },
      {
        $set: {
          Name: req.body.Name,
        },
      },
      { new: true },
      (error, course) => {
        if (error) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: "Error while updating Course..!!",
          });
        }

        if (!course) {
          return res.status(HttpStatus.NOT_FOUND).json({
            error: "Course not found..!!",
          });
        }

        return res.status(HttpStatus.OK).json({
          message: "Course updated successfully..!!",
          course: course,
        });
      }
    );
  },

  //Getting Course by "Id"
  async CourseByID(req, res, next, Id) {
    await Course.findById(Id).exec((error, course) => {
      req.course = course;
      next();
    });
  },

  async getCourseById(req, res) {
    if (req.course) {
      return res.json(req.course);
    }
  },
};
