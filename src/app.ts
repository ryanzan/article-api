import express, { Application } from 'express';

export default class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }
    private initializeMiddlewares(): void {
        this.app.use(express.json());
    }
    public addRoutes(routes: Array<{ path: string; router: express.Router }>): void {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
}
