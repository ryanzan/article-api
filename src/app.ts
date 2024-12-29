import express, {Application} from 'express';
import ResponseInterceptor from "./middleware/ResponseInterceptor";
import {Logger} from "./utils/logger";

export default class App {
    public app: Application;
    private readonly logger = Logger.getInstance().logger();

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }
    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(ResponseInterceptor.intercept);
    }
    public addRoutes(routes: Array<{ path: string; router: express.Router }>): void {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
    public listen(port: number): void {
        this.app.listen(port, () => {
            this.logger.info(`Server is running on http://localhost:${port}`);
        });
    }
}
