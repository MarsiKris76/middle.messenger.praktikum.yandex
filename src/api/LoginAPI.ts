import { BaseAPI } from "./BaseAPI";
import {LoginRequest, SignUpRequest, SignUpResponse, SimpleResponse, UserResponse} from "../type/Types";

class LoginAPI extends BaseAPI {
    private static __instance: LoginAPI;

    constructor() {
        if (LoginAPI.__instance) {
            return LoginAPI.__instance;
        }
        super('/auth');
        LoginAPI.__instance = this;
    }

    public async login(data: LoginRequest) {
        return await this.http.post<SimpleResponse>('/signin', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async logout() {
        return await this.http.post<SimpleResponse>('/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async signup(data: SignUpRequest) {
        return await this.http.post<SignUpResponse>('/signup', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async getUser() {
        return await this.http.get<UserResponse>('/user', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public static getInstance(): LoginAPI {
        if (!LoginAPI.__instance) {
            LoginAPI.__instance = new LoginAPI();
        }
        return LoginAPI.__instance;
    }

}

export default LoginAPI.getInstance();
