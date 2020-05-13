const User = require('../models/users');
const jwt = require('jsonwebtoken')
const secret =  'GuestbookSecret';

module.exports = {
    register: async (req, res, next) => {
        let user, token
        const record = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            isOwner: req.body.isOwner
        };
        try {
            user =  await User.create(record);
            token = await sign({email: user.email, name: user.name, _id: user._id, isOwner: user.isOwner})
            res.send({
                data: user, token
            });
        }
        catch (error) {
            return next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                const isValidPassword = await user.validatePassword(req.body.password)
                if (isValidPassword) {
                    let token = await sign({email: user.email, name: user.name, _id: user._id, isOwner: user.isOwner})
                    res.send({
                        data: user, token
                    });
                }
                res.status(401).send('email or password is incorrect')
            }
            res.status(400).send('User not found')
        } catch (error) {
            return next(error);
        }
    },
};
async function sign(payload) {
    return await jwt.sign(payload, secret, {
        issuer:  'Guestbook App',
        subject:  'user',
        audience:  'guestbook',
        expiresIn: '7d'
    })
}