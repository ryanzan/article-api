import PostgreSQLService from "../service/PostgreSQLService";
import {Pool} from "pg";
import {Article} from "../types/Article";
export default class ArticleRepository{
    private db: PostgreSQLService;

    public constructor() {
        const pool: Pool = new Pool({
            "host": process.env.DB_HOST,
            "user": process.env.DB_USER,
            "database": process.env.DB_NAME,
            "password": process.env.DB_PASSWORD,
            "port": parseInt(process.env.DB_PORT || '5432', 10)
        });
        PostgreSQLService.initialize(pool);
        this.db = PostgreSQLService.getInstance();
    }

    public async storeArticle(article: Article) {
        const sql = `
            INSERT INTO articles (title, content, image_path, created_by, updated_by)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const values = [article.title, article.content, article.image_path, article.created_by, article.created_by];
        const data = await this.db.query(sql, values);
        return data.rows[0];
    }
    public async getArticles(): Promise<Article[]>{
        const sql = 'SELECT * FROM articles ORDER BY created_at DESC;';
        const data = await this.db.query(sql);
        return data.rows;
    }

    public async getArticleById(id: number): Promise<Article>{
        const sql = 'SELECT * FROM articles WHERE id = $1;'
        const data = await this.db.query(sql, [id]);
        return data.rows[0];
    }

    public async updateArticle(article: Article):  Promise<Article> {
        const sql = `
            UPDATE articles
            SET title = $1, content = $2, image_path = $3, updated_by = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING *;
        `;
        const values = [article.title, article.content, article.image_path, article.updated_by, article.id];
        const data = await this.db.query(sql, values);
        return data.rows[0];
    }

    public async deleteArticle(id: number):  Promise<Article> {
        const sql = 'DELETE FROM articles WHERE id = $1 RETURNING *';
        const data = await this.db.query(sql, [id]);
        return data.rows[0];
    }
}