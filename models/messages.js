const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "User"
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reply:{
        type: String,
        default:""
    }
},
{
    timestamps: true,
});


const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;