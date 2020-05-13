const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController')
const MessageController = require('../controller/MessagesController')
const authorize = require('../middlewares/authorize');

router.get('/health', (req, res) => {
    res.json({"message": "Service is up"})
})
router.post('/user/register', UserController.register)
router.post('/user/login', UserController.login)

router.post('/message', authorize(), MessageController.createMessage)
router.put('/message/:id', authorize(), MessageController.editMessage)
router.get('/message/:id', authorize(), MessageController.getMessageById)
router.get('/message', authorize(), MessageController.getMessages)
router.put('/message/:id/reply', authorize(), MessageController.replyMessage)
router.delete('/message/:id', authorize(), MessageController.deleteMessage)
module.exports = router;