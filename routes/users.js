const express = require('express')
const router = express.Router()
const userControllerClass = require('../controllers/user')

const userController = new userControllerClass

// user routes
router.get('/user/register', (req, res) => res.render('loginForm'))
router.post('/user/register', async (req, res) => {
    try {
        const result = await userController.register(req.body)
        console.log(result)
        if (typeof result != 'string'){
            res.render('loginForm', { session: result })
        } else {
            res.render('loginForm', { error: result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating user');
    } 
})

router.get('/user/login', (req, res) => res.render('loginForm', { login: true }))
router.post('/user/login', async (req, res) => {
    try {
        const result = await userController.login(req.body)
        console.log(result)
        if (typeof result != 'string'){
            res.render('loginForm', { login: true, session: result })
        } else {
            res.render('loginForm', { login: true, error: result })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    } 
})

router.delete('/user/delete/:id', (req, res) => userController.deleteUser(req, res))

// admin routes
router.put('/admin/add/:id', (req, res) => userController.addAdmin(req,res));
router.put('/admin/remove/:id', (req, res) => userController.removeAdmin(req,res));

module.exports = router

