import { Router } from 'express';
import ArticleController from "../controller/ArticleController";
import ArticleService from "../service/ArticleService";
import AuthenticationService from "../service/AuthenticationService";
import AuthenticationController from "../controller/AuthenticationController";
import {AuthenticationMiddleware} from "../middleware/AuthenticationMiddleware";

const router = Router();
const articleService = new ArticleService();
const articleController = new ArticleController(articleService);
const authenticationService = new AuthenticationService();
const authenticationController = new AuthenticationController(authenticationService);

router.post('/login' ,(req, res) => authenticationController.login(req, res));

router.get('/articles',  AuthenticationMiddleware.authenticate,(req, res) => articleController.getArticles(req, res));
router.get('/articles/:id',  AuthenticationMiddleware.authenticate,(req, res) => articleController.getArticleById(req, res));
router.post('/articles',  AuthenticationMiddleware.authenticate,(req, res) => articleController.storeArticle(req, res));
router.put('/articles/:id', AuthenticationMiddleware.authenticate, (req, res) => articleController.updateArticle(req, res));
router.delete('/articles/:id',  AuthenticationMiddleware.authenticate,(req, res) => articleController.deleteArticle(req, res));


export default router;
