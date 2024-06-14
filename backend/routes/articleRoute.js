const express = require('express');
const ArticleController = require('../controllers/ArticleController');

const articleRoute = express.Router();
const articleController = new ArticleController();

articleRoute.get('/apis', articleController.getApiList);
articleRoute.get('/filters', articleController.getFilterSettings);
articleRoute.get('/search', articleController.search);

module.exports = articleRoute;
