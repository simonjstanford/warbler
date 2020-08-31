require("dotenv").config();
const jwt = require("jsonwebtoken");

//make sure the user is logged in - Authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next(PleaseLogIn());
            }
        })
    } catch (error) {
        return next(PleaseLogIn());
    }
};

//make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (decoded && decoded.id == req.params.id) {
                return next();
            } else {
                return next(Unathorized());
            }
        })
    } catch (error) {
        return next(Unathorized());
    }
};

function PleaseLogIn() {
    return {
        status: 401,
        message: "Please log in"
    };
}

function Unathorized() {
    return {
        status: 401,
        message: "Unathorized"
    };
}
