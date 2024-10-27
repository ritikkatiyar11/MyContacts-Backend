var jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const validate = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.private_key, (err, decoded) => {
            if (err) {
                res.status(401);
                const error = new Error("User not authorized");
                return next(error);
            } else {
                req.user = decoded;  // optional: store decoded token data in req.user
                next();  // move to the next middleware or route handler
            }
        });
    } else {
        res.status(401);
        return next(new Error("Authorization header missing or invalid"));
    }
});

module.exports = validate;
