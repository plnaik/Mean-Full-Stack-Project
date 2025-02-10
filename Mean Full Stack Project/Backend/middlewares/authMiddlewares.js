const jwt = require('jsonwebtoken');
const User = require('../models/userModel');




// Updated Code 
const auth = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authHeader = req.header('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No Token, Authorization Denied' });
        }

        // Extract the token by removing the "Bearer " part
        const token = authHeader.replace('Bearer ', '');

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
