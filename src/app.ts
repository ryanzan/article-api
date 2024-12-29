import express, {Application} from 'express';
import fileUpload from "express-fileupload";
import ResponseInterceptor from "./middleware/ResponseInterceptor";
import {Logger} from "./utils/logger";
import path from "path";
import * as fs from "fs";

export default class App {
    public app: Application;
    private uploadPath =  process.env.FILE_PATH || 'uploads';
    private readonly logger = Logger.getInstance().logger();

    constructor() {
        this.app = express();
        this.createDirUploadsIfNotExist();
        this.initializeMiddlewares();
    }
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(fileUpload());
        this.app.use('/uploads',express.static(path.join(__dirname,'../',this.uploadPath)));
        this.app.use(ResponseInterceptor.intercept);
    }
    public addRoutes(routes: Array<{ path: string; router: express.Router }>): void {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }

    public createDirUploadsIfNotExist(){
        const uploadsDir = path.join(__dirname,'../',this.uploadPath);
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
    }
    public listen(port: number): void {
        this.app.listen(port, () => {
            this.logger.info(`Server is running on http://localhost:${port}`);
        });
    }
}
