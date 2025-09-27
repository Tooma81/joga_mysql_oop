const express = require('express');
const router = express.Router();
const articleControllerClass = require('../controllers/article');

const articleController = new articleControllerClass;

router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/create', (req, res) => res.render('articleForm'));

router.post('/article/create', async (req, res) => {
    try {
        await articleController.createNewArticle(req.body)
        res.redirect(`/article/${req.body.slug}`)
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating article');
    } 
});

// Dynamic article routes
router.get('/article/:slug', (req, res) => articleController.getArticleBySlug(req, res));
router.put('/article/edit/:id', (req, res) => articleController.updateArticle(req,res));
router.get('/article/delete/:id', (req, res) => articleController.deleteArticle(req,res))

module.exports = router;