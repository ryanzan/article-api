import { Request, Response } from 'express';
import ArticleService from "../service/ArticleService";
import {RESOURCE_NOT_FOUND} from "../utils/constants.utils";

export default class ArticleController {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    public async getArticles(req: Request, res: Response):  Promise<void> {
        const result = await this.articleService.getArticles();
        res.json(result);
    }

    public async getArticleById(req: Request, res: Response):  Promise<void> {
        const id: number = parseInt(req.params.id);
        const result = await this.articleService.getArticleById(id);
        if (result){
            res.json(result);
        }else{
            res.status(404).json({ error: RESOURCE_NOT_FOUND });
        }
    }

    public async storeArticle(req: Request, res: Response):  Promise<void> {
        try {
            const result = await this.articleService.storeArticle(req.body, req.files?.image);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const result = await this.articleService.updateArticle(id, req.body, req.files?.image);
            if (result){
                res.status(200).json(result);
            }else {
                res.status(404).json({ error: RESOURCE_NOT_FOUND });
            }

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteArticle(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const result = await this.articleService.deleteArticle(id);
        if (result){
            res.status(200).json(result);
        }else {
            res.status(404).json({ error: RESOURCE_NOT_FOUND });
        }
    }
}
