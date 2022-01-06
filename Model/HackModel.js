const mongoose = require('mongoose');
const Joi = require('joi');

const schemaHacks = new mongoose.Schema({

    Title: {
        type: String
        , max: 100,
        min: 1
    },
    Category: {
        type: String
        , max: 100,
        min: 1
    },

    Tags: {
        type: String
        , max: 100,
        min: 1
    },
    Description: {
        type: String
        , max: 1000,
        min: 1
    },
    ImageUrl: String


});

const Hacks = mongoose.model("Hack", schemaHacks);

const Validation = function (body) {
    const validator = Joi.object({
        Title: Joi.string().max(100).min(1),
        Category: Joi.string().max(100).min(1),
        Tags: Joi.string().max(100).min(1),
        Description: Joi.string().max(1000).min(1),
        ImageUrl: Joi.string()
    })

    const result = validator.validate(body);
    return result;

};


module.exports.Hacks = Hacks;
module.exports.Validation = Validation;


