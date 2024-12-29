import {Request, Response} from 'express';
import ArticleService from "../service/ArticleService";
import {RESOURCE_NOT_FOUND} from "../utils/constants.utils";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         image_path:
 *           type: string
 *         created_by:
 *           type: integer
 *         updated_by:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 */

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: The articles managing API
 */

export default class ArticleController {
    private articleService: ArticleService;

    constructor(articleService: ArticleService) {
        this.articleService = articleService;
    }

    /**
     * @swagger
     * /articles:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Get a list of all articles
     *     tags: [Articles]
     *     responses:
     *       200:
     *         description: A list of articles
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     $ref: '#/components/schemas/Article'
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *       401:
     *         description: Unauthorized
     */
    public async getArticles(req: Request, res: Response): Promise<void> {
        const result = await this.articleService.getArticles();
        res.json(result);
    }

    /**
     * @swagger
     * /articles/{id}:
     *   get:
     *     security:
     *       - BearerAuth: []
     *     summary: Get an article by its ID
     *     tags: [Articles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *      200:
     *         description: A single article object
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/Article'
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *      404:
     *         description: Article not found
     *      401:
     *         description: Unauthorized
     */
    public async getArticleById(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const result = await this.articleService.getArticleById(id);
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({error: RESOURCE_NOT_FOUND});
        }
    }

    /**
     * @swagger
     * /articles:
     *   post:
     *     security:
     *       - BearerAuth: []
     *     summary: Store a new article
     *     tags: [Articles]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - title
     *               - content
     *             properties:
     *               title:
     *                 type: string
     *               content:
     *                 type: string
     *               image:
     *                 type: string
     *     responses:
     *       201:
     *        description: Created article object
     *        content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/Article'
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: Invalid input
     *       401:
     *         description: Unauthorized
     */
    public async storeArticle(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.articleService.storeArticle(req.body, req.files?.image);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    /**
     * @swagger
     * /articles/{id}:
     *   put:
     *     security:
     *       - BearerAuth: []
     *     summary: Update an existing article
     *     tags: [Articles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - title
     *               - content
     *             properties:
     *               title:
     *                 type: string
     *               content:
     *                 type: string
     *               image:
     *                 type: string
     *     responses:
     *       200:
     *          description: Updated article object
     *          content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   $ref: '#/components/schemas/Article'
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *       400:
     *         description: Invalid input
     *       404:
     *         description: Article not found
     *       401:
     *         description: Unauthorized
     */
    public async updateArticle(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const result = await this.articleService.updateArticle(id, req.body, req.files?.image);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({error: RESOURCE_NOT_FOUND});
            }

        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    /**
     * @swagger
     * /articles/{id}:
     *   delete:
     *     security:
     *       - BearerAuth: []
     *     summary: Delete an article by its ID
     *     tags: [Articles]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *          description: Deleted article object
     *          content:
     *               application/json:
     *                  schema:
     *                      type: object
     *                      properties:
     *                          success:
     *                              type: boolean
     *                          data:
     *                              $ref: '#/components/schemas/Article'
     *                          timestamp:
     *                              type: string
     *                              format: date-time
     *       404:
     *         description: Article not found
     *       401:
     *         description: Unauthorized
     */
    public async deleteArticle(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id);
        const result = await this.articleService.deleteArticle(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({error: RESOURCE_NOT_FOUND});
        }
    }
}
