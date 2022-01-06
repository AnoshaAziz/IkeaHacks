const jwt = require('jsonwebtoken');
var constants = require('../Shared/Constants');

module.exports = function (req, res, next) {

    const token = req.header('x-new-token');
    if (!token) {
        return res.status(403).send({ message: "Unauthorized access" });
    }
    try {
        const decoded = jwt.verify(token, constants.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        return res.status(403).send({ message: "Unauthorized access" });
    }
}