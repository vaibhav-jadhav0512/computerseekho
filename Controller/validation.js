const Joi = require('@hapi/joi');


const RegisterValidation = (data)=>{
    const schema={
        Name : Joi.string().min(8).required(),
        Email : Joi.string().min(6).required().email(),
        UserName: Joi.string().min(8).required(),
        Password : Joi.string().min(8).required(),
        Address : Joi.string().min(10).required(),
        Gender : Joi.string().min(4).required(),
        PhotoUrl : Joi.string().min(10).required(),
        DOB: Joi.date(),
        Age: Joi.number().min(1).required(),
        Qualification: Joi.string().min(3).required(),
        Mobile : Joi.number().min(10).required(),
        AlternateMobile : Joi.number().min(10).required(),
        IsActive : Joi.boolean().required(),
        Date : Joi.date()
    };
    return Joi.validate(data,schema);
};

const LoginValidation = (data) =>{
    const schema={
        UserName : Joi.string().min(6).required(),
        Password : Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
}
module.exports.LoginValidation = LoginValidation;
module.exports.RegisterValidation = RegisterValidation;
