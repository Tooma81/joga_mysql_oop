const bcrypt = require('bcrypt')
const userDbModel = require('../models/user')
const userModel = new userDbModel()

class userController {
    async register(user_data){
        if(await userModel.findByName(user_data.username)){
            return 'Username already taken'
        } else {
            // Password needs to be at least 6 characters
            //  and cannot be 'qwerty', 'password' or a continious sequence of numbers
            if(
                !user_data.password ||
                user_data.password.length < 6 || 
                '1234567890'.includes(user_data.password) ||
                ['qwerty', 'password'].includes(user_data.password.toLowerCase())
            ){
                return 'Choose a stronger password'
            } else {
                const cryptPassword = await bcrypt.hash(user_data.password, 10)
                const registeredId = await userModel.create({
                    username: user_data.username,
                    email: user_data.email,
                    password: cryptPassword,
                    role: 'user'
                })
                if(registeredId){
                    const userData = await userModel.findById(registeredId)
                    const userSession = {
                        username: userData.username,
                        user_id: userData.id,
                        role: userData.role
                    }
                    return userSession
                }
            }
        }
    }

    async login(user_data){
        const userData = await userModel.findByName(user_data.username) 
        if(!userData){
            return 'User not found'
        } else {
            // check if entered password matches hash and log in
            if (await bcrypt.compare(user_data.password, userData.password)){
                const userSession = {
                    username: userData.username,
                    user_id: userData.id,
                    role: userData.role
                }
                return userSession
            } else {
                return `Incorrect password`
            }
        }
    }

    async deleteUser(req, res){
        const affectedRows = await userModel.delete(req.params.id)
        res.status(201).json({
            message: `deleted ${affectedRows} user(s)`,
            user: {id: req.params.id}
        })
    }

    async addAdmin(req, res){
        const affectedRows = await userModel.update(req.params.id, {role: 'admin'})
        res.status(201).json({
            message: `added ${affectedRows} user(s) as admin`,
            user: {id: req.params.id}
        })
    }

    async removeAdmin(req, res){
        const affectedRows = await userModel.update(req.params.id, {role: 'user'})
        res.status(201).json({
            message: `removed ${affectedRows} user(s) as admin`,
            user: {id: req.params.id}
        })
    }
}

module.exports = userController;
