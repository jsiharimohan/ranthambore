const jwt = require("jsonwebtoken");
const Auth = require('../Models/Auth.model');

const config = process.env;

exports.verifyUserToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer', '').trim()

        const decoded = jwt.verify(token, config.JWT_SEC);

        const user = await Auth.findOne({ _id: decoded.id, 'tokens.token': token });

        if (!user) {
            return res.status(401).send({ error: 'Expired token!' })
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

