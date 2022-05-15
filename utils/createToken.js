require('dotenv')
const jwt = require('jsonwebtoken')

const SECRET = process.env.MY_TOKEN_SECRET

const createToken = async (email) => {
    const payload = {
        check: true,
        email: email
    };
    
    const token = jwt.sign(payload, SECRET, {
        expiresIn: "30min"
    });
    return token
};

module.exports = { createToken };