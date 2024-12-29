import { Request, Response } from 'express';
import AuthenticationService from "../service/AuthenticationService";
import {Logger} from "../utils/logger";
import {INVALID_CREDENTIALS} from "../utils/constants.utils";

export default class AuthenticationController{
    private authenticationService: AuthenticationService;
    private readonly logger = Logger.getInstance().logger();

    constructor(authenticationService: AuthenticationService) {
      this.authenticationService = authenticationService;
    }

    public  async login(req: Request, res: Response){
        const userName = req.body.userName;
        const password = req.body.password;
        try{
            const token = this.authenticationService.login(userName,password);
            res.status(200).json({token});
        }catch (error: any){
            this.logger.error(error?.message);
            res.status(401).json({error: INVALID_CREDENTIALS });
        }
    }
}