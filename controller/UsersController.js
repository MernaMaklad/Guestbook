const User = require('../models/users');

module.exports = {
    register: async (req, res, next) => {
        let user
        const record = {
            name : req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        try {
            user =  await User.create(record); 
            res.send({
                data: user
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
                    res.send({
                        data: user
                    });
                }
                res.status(401).send('email or password is incorrect')
            }
            res.status(400).send('User not found')
        } catch (error) {
            return next(error);
        }
    },
}