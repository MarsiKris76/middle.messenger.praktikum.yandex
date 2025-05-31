import { BaseAPI } from "./BaseAPI";
import {LoginRequest, LoginResponse, SignUpRequest, SignUpResponse} from "../type/Types";

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
        return await this.request<LoginRequest, LoginResponse>(data);
    }

    public async logout() {
        return await this.delete<LoginResponse>();
    }

    public async signup(data: SignUpRequest) {
        return await this.create<SignUpRequest, SignUpResponse>(data);
    }

    public async signup(data: SignUpRequest) {
        return await this.create<SignUpRequest, SignUpResponse>(data);
    }

    //логинимся
    protected override async request<Q, R>(data: Q): Promise<R>{
        return await this.http.post<R>('/signin', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    //выходим
    protected override async delete<R>(): Promise<R>{
        return await this.http.post<R>('/logout', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    //регистрируемся
    protected override async create<Q, R>(data: Q): Promise<R>{
        return await this.http.post<R>('/signup', {
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    //получить профиль
    protected override async update<R>(): Promise<R>{
        return await this.http.put<R>('/signup', {})
    }

    public static getInstance(): LoginAPI {
        if (!LoginAPI.__instance) {
            LoginAPI.__instance = new LoginAPI();
        }
        return LoginAPI.__instance;
    }

}

export default LoginAPI.getInstance();
