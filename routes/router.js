const express = require('express');
const router = express.Router();
const UserController = require('../controller/UsersController')

router.get('/health', (req, res) => {
    res.json({"message": "Service is up"})
})
router.post('/register', UserController.register)
router.post('/login', UserController.login)


module.exports = router;