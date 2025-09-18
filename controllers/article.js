const authorDbModel = require('../models/author')
const articleDbModel = require('../models/article')

const authorModel = new authorDbModel();
const articleModel = new articleDbModel();

class articleController {
    constructor() {
        const articles = []
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.render('index', {
            title: 'Articles',
            articles
        })
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        const author = await authorModel.findById(article.author_id)
        console.log(author)
        article['author_name'] = author.name
        res.render('article', {
            title: article.title,
            article
        })
    }
}

module.exports = articleController