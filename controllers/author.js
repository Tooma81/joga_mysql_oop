const authorDbModel = require('../models/author')
const articleDbModel = require('../models/article')

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class authorController {
    constructor() {
        const authors = []
    }

    async getAuthorById(req, res) {
        const author = await authorModel.findById(req.params.id)
        const author_articles = await articleModel.findMany(author.id)
        author['articles'] = author_articles
        res.render('author', {
            title: author.name,
            author,
            author_articles
        })
    }
}

module.exports = authorController