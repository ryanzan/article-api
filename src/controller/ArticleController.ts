import { Request, Response } from 'express';
import ArticleService from "../service/ArticleService";

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
        const id: string = req.params.id;
        const result = await this.articleService.getArticleById(id);
        res.json(result);
    }

    public async storeArticle(req: Request, res: Response):  Promise<void> {
        try {
            const result = await this.articleService.storeArticle(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const result = await this.articleService.updateArticle(id, req.body);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    public async deleteArticle(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const result = await this.articleService.deleteArticle(id);
        res.json(result);
    }
}
