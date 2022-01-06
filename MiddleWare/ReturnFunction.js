
module.exports = function (functionParameter) {

    return async function (req, res, next) {
        try {
            await functionParameter(req, res);
        }
        catch (ex) {

            next();
        }
    }



}