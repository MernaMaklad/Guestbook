const Message = require('../models/messages')

module.exports = {
    createMessage : async(req, res, next) => {
        let message
        try{
            message = await Message.create({message: req.body.message, userId: req.user._id, receiverId: req.body.receiverId})
            return res.send({
                data: message
            });
        }catch(error){
            return next(error)
        }
    },
    editMessage : async(req, res, next) => {
        try{
            const message = await Message.findOneAndUpdate({_id: req.params.id, userId: req.user._id}, {message: req.body.message}, {new: true})
            return res.send({
                data: message,
                message:"Message Update Successfully"
            });
        }catch(error){
            return next(error)
        }
    },
    getMessages: async(req, res, next) => {
        try{
            const messages = await Message.find().populate('userId')
            return res.send({
                data: messages
            })
        }catch(error){
            return next(error)
        }
    },
    getMessageById: async (req, res, next) => {
        try{
            const message = await Message.findOne({_id: req.params.id}).populate('userId')
            return res.send({
                data: message
            })
        }catch(error){
            return next(error)
        }
    },
    replyMessage: async(req, res, next) =>{
        try{
            const message = await Message.findOneAndUpdate({_id: req.params.id, receiverId: req.user._id}, {reply: req.body.reply}, {useFindAndModify: false, new: true})
            return res.send({
                data: message,
                message:"Reply Added Successfully"
            });
        }catch(error){
            return next(error)
        }
    },
    deleteMessage: async(req, res, next) => {
        try{
            const message = await Message.findOneAndDelete({_id: req.params.id, userId: req.user._id})
            return res.send({
                data: message,
                message: "Deleted Successfully"
            })
        }catch(error){
            return next(error)
        }
    }

}