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

    async createNewArticle(article_data){
        const newArticle = {
            name: article_data.name,
            slug: article_data.slug,
            image: article_data.image,
            body: article_data.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),
            author_id: article_data.author_id
        }
        const articleId = await articleModel.create(newArticle)
        return {id: articleId, ...newArticle}
    }
    

    async updateArticle(req, res){
        const updatedArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            author_id: req.body.author_id
        }
        const affectedRows = await articleModel.update(req.params.id, updatedArticle)
        res.status(201).json({
            message: `updated ${affectedRows} article(s)`,
            article: {id: req.params.id, ...updatedArticle}
        })
    }

    async deleteArticle(req, res){
        const affectedRows = await articleModel.delete(req.params.id)
        console.log(`Deleted ${affectedRows} article(s)`)
        res.redirect('/')
    }
}

module.exports = articleController