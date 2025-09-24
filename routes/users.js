const express = require('express')
const router = express.Router()
const userControllerClass = require('../controllers/user')

const userController = new userControllerClass

// user routes
router.post('/user/register', (req, res) => userController.register(req, res))
router.get('/user/login', (req, res) => userController.login(req, res))
router.delete('/user/delete/:id', (req, res) => userController.deleteUser(req, res))

// admin routes
router.put('/admin/add/:id', (req, res) => userController.addAdmin(req,res));
router.put('/admin/remove/:id', (req, res) => userController.removeAdmin(req,res));

module.exports = router

