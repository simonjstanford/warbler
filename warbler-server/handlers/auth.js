const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next) {

}

exports.signup = async function(req, res, next) {
    try {
        //create a user
        let user = await db.User.create(req.body);
        let { id, username, profileImageUrl } = user;

        //create a token (signing a token)
        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });
        
    } catch (error) {
        //responding with username/email already taken
        if (error.code === 11000) {
            error.message = "Username and/or email already taken";
        }

        //othewise just send back a generic 400
        return next({
            status: 400,
            message: error.message
        });
    }
}