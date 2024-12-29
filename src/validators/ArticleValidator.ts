import Joi from 'joi';
import {UNSUPPORTED_FILE_TYPE} from "../utils/constants.utils";

export default class ArticleValidator {
    private schema: Joi.ObjectSchema;
    constructor() {
        this.schema = Joi.object({
            title: Joi.string().min(3).max(100).required(),
            content: Joi.string().min(10).required(),
        });
    }

    public validateImage(file: any){
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new Error(UNSUPPORTED_FILE_TYPE);
        }
    }
    public validate(data: any): { error?: string; value?: any } {
        const { error, value } = this.schema.validate(data);
        if (error) {
            return { error: error.details[0].message };
        }
        return { value };
    }
}
