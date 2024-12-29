import jwt from 'jsonwebtoken';
import UserRepository from "../repository/UserRepository";
import {INVALID_CREDENTIALS} from "../utils/constants.utils";

export default class AuthenticationService{
    private readonly repository: UserRepository;
    private readonly secretKey: string;
    constructor() {
        this.repository = new UserRepository();
        this.secretKey = process.env.SECRET_KEY || "50f050f7d7f9f4394453a9043bc47de5e8d4f8630acacd3378517296a3c54577bb1489d9594003bfa73806509d1b800e803c85a2aeccdb45af25d0c50f64893ff7530cf001fafe43c3f8e6a8b832c3490a4c91f184e8cddb6ad9c6bff66fd36a38eabf6ea81b3f671c368d18538fb649f1726f1247e329af901ca6a69bf3892e3e96d5dbbcf5a478f73fa175f3f95fad6966e8d003c5d83893d7c82a2a9cacd3a46b716f9e7f30a8c7221aba914a07ac7dd0ac87645392855ec135fa1e00cf9dedbcf2f1ef4c5d8b2d58726270954dc30cb78cb12c26cbd6b38d3e7c605b93ce05cae49ec386bc12a015dd2733651adcf8fa7a11a9f3b2a5fbcbb6bad1d6ab4d"
    }
    public login(userName: string, password: string): string {
        const user = this.repository.getUserByUserName(userName);
        if (user && user.password === password){
            return jwt.sign({userName, id: user.id}, this.secretKey, {expiresIn: '1h'});
        }
        throw new Error(INVALID_CREDENTIALS);
    }
}