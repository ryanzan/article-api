import ArticleValidator from "../validators/ArticleValidator";
import ArticleRepository from "../repository/ArticleRepository";
import {Article} from "../types/Article";
import MediaService from "./MediaService";
import {Logger} from "../utils/logger";

export default class ArticleService {
    private validator: ArticleValidator;
    private repository: ArticleRepository;
    private mediaService: MediaService;
    private readonly logger = Logger.getInstance().logger();


    constructor() {
        this.validator = new ArticleValidator();
        this.repository = new ArticleRepository();
        this.mediaService = new MediaService();
    }

    public async getArticles(): Promise<Article[]> {
        return await this.repository.getArticles();
    }

    public async getArticleById(id: number): Promise<Article> {
        return await this.repository.getArticleById(id);
    }

    public async storeArticle(data: any, image: any): Promise<Article> {
        const title = data.title;
        const content = data.content;
        let image_path = '';
        const validation = this.validator.validate({title, content});
        if (validation.error) {
            throw new Error(validation.error);
        }
        if (image) {
            try {
                this.validator.validateImage(image);
                image_path = await this.mediaService.uploadFile(image);
            } catch (error: any) {
                this.logger.error(error?.message);
                throw new Error(error?.message);
            }
        }
        const article: Article = {
            title,
            content,
            image_path: image_path,
            created_by: data.user.id,
            updated_by: data.user.id
        }
        return await this.repository.storeArticle(article);
    }

    public async updateArticle(id: number, data: any, image: any): Promise<Article | null> {
        const oldArticle = await this.getArticleById(id);
        if (!oldArticle){
            return null;
        }
        const title = data.title;
        const content = data.content;
        const validation = this.validator.validate({title, content});
        let image_path = '';
        if (validation.error) {
            throw new Error(validation.error);
        }
        if (image) {
            try {
                this.validator.validateImage(image);
                image_path = await this.mediaService.uploadFile(image);
            } catch (error: any) {
                this.logger.error(error?.message);
                throw new Error(error?.message);
            }
        }
        const article: Article = {
            id: id,
            title,
            content,
            image_path: image_path,
            created_by: oldArticle.created_by,
            updated_by: data.user.id
        }
        return await this.repository.updateArticle(article);
    }

    public async deleteArticle(id: number): Promise<Article | null> {
        const oldArticle = await this.getArticleById(id);
        if (!oldArticle){
            return null;
        }
        const article = await this.repository.deleteArticle(id);
        if (article.image_path){
            this.mediaService.deleteFile(article.image_path);
        }
        return article;
    }
}
