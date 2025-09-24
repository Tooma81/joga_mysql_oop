const BaseSQLModel = require('./base')

class UserModel extends BaseSQLModel {
    constructor() {
        super('user');
    }

    async findAll(){
        const users = await super.findAll()
        return users
    }

    async findByName(username){
        const user = await super.findOne('username', username)
        return user
    }

    async findById(id){
        const user = await super.findById(id)
        return user
    }

    async create(user){
        const createdUserId = await super.create(user)
        return createdUserId
    }

    async delete(id){
        const affectedRows = await super.delete(id)
        return affectedRows
    }
}
module.exports = UserModel;