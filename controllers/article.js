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
        article['author_name'] = author.name
        res.render('article', {
            title: article.title,
            article
        })
    }

    async createNewArticle(req, res){
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: req.body.author_id
        }
        const articleId = await articleModel.create(newArticle)
        res.status(201).json({
            message: `created new article with id ${articleId}`,
            article: {id: articleId, ...newArticle}
        })
    }
}

module.exports = articleController