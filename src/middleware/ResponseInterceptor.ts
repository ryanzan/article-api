import {Request, Response, NextFunction} from 'express';
export default class ResponseInterceptor {
    public static intercept(req: Request, res: Response, next: NextFunction): void {
        const originalSend = res.json;
        res.json = function (body: any): Response {
            const formattedResponse = {
                success: true,
                data: body,
                timestamp: new Date().toISOString()
            };
            return originalSend.call(this, formattedResponse);
        };
        next();
    }
}