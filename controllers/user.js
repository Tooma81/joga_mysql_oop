const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {
    async register(req, res){
        if(await userModel.findOne(req.body.username)){
            res.json({
                message: 'Username already taken'
            })
        } else {
            // Password needs to be at least 6 characters
            //  and cannot be 'qwerty', 'password' or a continious sequence of numbers
            if(
                !req.body.password ||
                req.body.password.length < 6 || 
                '1234567890'.includes(req.body.password) ||
                ['qwerty', 'password'].includes(req.body.password.toLowerCase())
            ){
                res.json({
                    message: 'Invalid password'
                })
            } else {
                const cryptPassword = await bcrypt.hash(req.body.password, 10)
                const registeredId = await userModel.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: cryptPassword
                })
                if(registeredId){
                    const userData = await userModel.findById(registeredId)
                    req.session.user = {
                        username: userData.username,
                        user_id: userData.id
                    }
                    res.json({
                        message: 'New user is registered',
                        user_session: req.session.user
                    })
                }
            }
        }
    }
}

module.exports = userController;
