const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_KEY || 'GuestbookSecret';

module.exports = () => {
    return async (req, res, next) => {
        const token = req.headers.token
        try{
            if (token) {
                const user = await jwt.verify(token, SECRET)
                if (user) {
                    req.user = user;
                    return next();
                }
            }
            throw new Error('token required');
        }catch(error){
            return next(error)
        }
    
    };
}
