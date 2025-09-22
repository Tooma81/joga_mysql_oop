const BaseSQLModel = require('./base')

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article');
    }

    async findAll(){
        const articles = await super.findAll()
        return articles
    }

    async findOne(slug){
        const article = await super.findOne('slug', slug)
        return article
    }

    async findMany(author_id){
        const article = await super.findMany('author_id', author_id)
        return article
    }

    async create(article){
        const createdArticleId = await super.create(article)
        return createdArticleId
    }

    async update(id, data){
        const affectedRows = await super.update(id, data)
        return affectedRows
    }
}
module.exports = ArticleModel;