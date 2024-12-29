import {User} from "../types/User";

export default class UserRepository {
    private users: User[];

    constructor() {
        this.users = [
            {
                id:32,
                userName: 'ranjan',
                password: 'password'
            }
        ]
    }
    public getUserByUserName(userName: string) {
        return this.users.find(user => user.userName === userName);
    }
}