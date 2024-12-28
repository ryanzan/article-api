import ArticleValidator from "../validators/ArticleValidator";
import ArticleRepository from "../repository/ArticleRepository";
import {Article} from "../type/Article";

export default class ArticleService {
    private validator: ArticleValidator;
    private repository: ArticleRepository;

    constructor() {
        this.validator = new ArticleValidator();
        this.repository = new ArticleRepository();
    }

    public async getArticles(): Promise<Article[]> {
        return await this.repository.getArticles();
    }

    public async getArticleById(id: string): Promise<Article> {
        return await this.repository.getArticleById(id);
    }

    public async storeArticle(data: any): Promise<Article> {
        const title = data.title;
        const content = data.content;
        const validation = this.validator.validate({title, content});
        if (validation.error) {
            throw new Error(validation.error);
        }
        const article: Article = {
            title,
            content,
            image_path: "image path",
            created_by: 1,
            updated_by: 1
        }
        return await this.repository.storeArticle(article);
    }

    public async updateArticle(id: number, data: any): Promise<Article> {
        const title = data.title;
        const content = data.content;
        const validation = this.validator.validate({title, content});
        if (validation.error) {
            throw new Error(validation.error);
        }
        const article: Article = {
            id: id,
            title,
            content,
            image_path: "image path",
            created_by: 1,
            updated_by: 1
        }
        return await this.repository.updateArticle(article);
    }

    public async deleteArticle(id: number): Promise<Article> {
        return await this.repository.deleteArticle(id);
    }
}
