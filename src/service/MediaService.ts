import {Logger} from "../utils/logger";
import {ERROR_UPLOADING_FILE, FILE_UPLOADED} from "../utils/constants.utils";
import path from "path";
import * as fs from "fs";

export default class MediaService{
    private uploadPath =  process.env.FILE_PATH || 'uploads';
    private readonly logger = Logger.getInstance().logger();

    public constructor() {}
    public async uploadFile(file: any): Promise<any> {
        const fileName = `${Date.now()}_${file.name}`;
        const filePath = path.join(__dirname, '../../', this.uploadPath, fileName);
        return new Promise((resolve, reject) => {
            file.mv(filePath, (err: any) => {
                if (err) {
                    this.logger.error(err);
                    reject(new Error(ERROR_UPLOADING_FILE));
                } else {
                    this.logger.info(FILE_UPLOADED);
                    resolve(fileName);
                }
            });
        });
    }

    public deleteFile(fileName: string) {
        try{
            fs.unlinkSync(path.join(__dirname, '../../', this.uploadPath, fileName))
        }catch (error: any){
            this.logger.error(error?.message);
        }
    }
}