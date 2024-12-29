import {Request, Response, NextFunction} from 'express';
export default class ResponseInterceptor {
    public static intercept(req: Request, res: Response, next: NextFunction): void {
        const originalSend = res.json;
        res.json = function (body: any): Response {
            const isSuccess = !body?.error;
            const formattedResponse = {
                success: isSuccess,
                data: body,
                timestamp: new Date().toISOString()
            };
            return originalSend.call(this, formattedResponse);
        };
        next();
    }
}