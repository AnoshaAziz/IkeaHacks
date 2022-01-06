const router = require('express').Router();
const { registerSchema, User, validationRegister, validatePassword } = require('../Model/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

    const { error } = validationRegister(req.body);
    if (error) {

        res.status(400).send({ message: error.details[0].message });
        return;

    };
    let user = await User.findOne({ email: req.body.email });
    if (user) {

        res.status(409).send({ message: "User already registered" });
        return;
    };

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.addToken();
    console.log(token);
    res.status(200).send({ token: token });

})
module.exports = router;

