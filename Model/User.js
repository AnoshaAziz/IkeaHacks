const mongoose = require('mongoose');
const Joi = require('joi');
const res = require('express/lib/response');
const passwordComplexity = require("joi-password-complexity");
const errorRegex = new Error("Invalid Password");
const jwt = require('jsonwebtoken');
var constants = require('../Shared/Constants');

const registerSchema = new mongoose.Schema({

    name: {
        type: String,
        maxlength: 15
    },

    email: {
        type: String, required: true

    },

    password: {

        type: String

    },

});
registerSchema.methods.addToken = function () {
    const result = jwt.sign({ _id: this._id }, constants.JWT_PRIVATE_KEY, { expiresIn: '1h' });
    return result;

}
const User = mongoose.model("User", registerSchema);


function validationRegister(body) {

    const schema = Joi.object({
        name: Joi.string().max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    const result = schema.validate(body);
    return result;
}


exports.registerSchema = registerSchema;

exports.User = User;
exports.validationRegister = validationRegister;