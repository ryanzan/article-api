import Joi from 'joi';

export default class ArticleValidator {
    private schema: Joi.ObjectSchema;
    constructor() {
        this.schema = Joi.object({
            title: Joi.string().min(3).max(100).required(),
            content: Joi.string().min(10).required(),
        });
    }
    public validate(data: any): { error?: string; value?: any } {
        const { error, value } = this.schema.validate(data);
        if (error) {
            return { error: error.details[0].message };
        }
        return { value };
    }
}
