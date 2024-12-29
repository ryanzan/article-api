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
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: Login and get JWT token
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successful login and JWT token generation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     token:
     *                       type: string
     *                       description: The JWT token issued on successful login
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     *       401:
     *         description: Unauthorized - Invalid credentials
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: false
     *                 data:
     *                   type: object
     *                   properties:
     *                     error:
     *                       type: string
     *                       description: Error Message
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     */
    public  async login(req: Request, res: Response){
        const userName = req.body.username;
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