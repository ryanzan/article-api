import { Router } from 'express';
import ArticleController from "../controller/ArticleController";
import ArticleService from "../service/ArticleService";

const router = Router();
const articleService = new ArticleService();
const articleController = new ArticleController(articleService);


router.get('/articles', (req, res) => articleController.getArticles(req, res));
router.get('/articles/:id', (req, res) => articleController.getArticleById(req, res));
router.post('/articles', (req, res) => articleController.storeArticle(req, res));
router.put('/articles/:id', (req, res) => articleController.updateArticle(req, res));
router.delete('/articles/:id', (req, res) => articleController.deleteArticle(req, res));

export default router;
