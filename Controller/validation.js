const joi = require('@hapi/joi');


const RegisterValidation = (data)=>{
    const schema={
        Name : joi.string().min(8).required(),
        Email : joi.string().min(6).required().email(),
        Password : joi.string().min(8).required(),
        _id: joi.string().min(3).required(),
        Address : joi.string().min(10).required(),
        Gender : joi.string().min(4).required(),
        Photo : joi.string().min(10).required(),
        DOB: joi.string().min(3).required(),
        Age: joi.number().min(1).required(),
        Qualification: joi.string().min(3).required(),
        Mobile : joi.number().min(10).required(),
        AlternateMobile : joi.number().min(10).required(),
        IsActive : joi.boolean().required(),
        Datte : joi.date()
    };
    return joi.validate(data,schema);
};

const loginValidation = data =>{
    const schema={
        Email : joi.string().min(6).required().email(),
        Password : joi.string().min(6).required()
    };
    return joi.validate(data,schema);
}
module.exports.loginValidation = loginValidation;
module.exports.RegisterValidation = RegisterValidation;
