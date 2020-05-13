const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

UserSchema.pre('save', async function save(next) {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});
UserSchema.methods.validatePassword = async function validatePassword(data) {
    return await bcrypt.compare(data, this.password);
};

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}



const User = mongoose.model('User', UserSchema);

module.exports = User;