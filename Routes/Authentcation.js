const router = require('express').Router();
const req = require('express/lib/request');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../Model/user');
const jwt = require('jsonwebtoken');
const author = require('../MiddleWare/Authentication');
router.get('/me', author, async (req, res) => {

    const result = await User.findById(req.user._id).select('-password');
    res.send(result);

})

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send({ message: "Invalid Input" });
        return;
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ message: "Invalid Input: Email" });
        return;
    }
    const hashed = await bcrypt.compare(req.body.password, user.password);
    if (!hashed) {
        res.status(400).send({ message: "Invalid Input:Password" });
        return;
    }
    const token = user.addToken();
    res.send({ token: token })

})

function validate(req) {

    const schema = joi.object({

        email: joi.string().email(),
        password: joi.string()

    })

    const result = schema.validate(req);
    return result;
}


module.exports = router;