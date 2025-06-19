import {BaseAPI} from "./BaseAPI";
import {
    ChangePasswordRequest,
    ChangeUserRequest,
    SearchUsersRequest,
    SimpleResponse,
    UserResponse
} from "../type/Types";

class UserAPI extends BaseAPI {
    private static __instance: UserAPI;

    constructor() {
        if (UserAPI.__instance) {
            return UserAPI.__instance;
        }
        super('/user');
        UserAPI.__instance = this;
    }

    public static getInstance(): UserAPI {
        if (!UserAPI.__instance) {
            UserAPI.__instance = new UserAPI();
        }
        return UserAPI.__instance;
    }

    public async searchUsers(login: SearchUsersRequest) {
        return await this.http.post<UserResponse[]>('/search', {
            data: login,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async changeUserProfile(newProfile: ChangeUserRequest) {
        return await this.http.put<UserResponse>('/profile', {
            data: newProfile,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async changeUserAvatar(avatar: FormData) {
        return await this.http.put<UserResponse>('/profile/avatar', {
            data: avatar,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async changeUserPassword(newPassword: ChangePasswordRequest) {
        return await this.http.put<SimpleResponse>('/password', {
            data: newPassword,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}

export default UserAPI.getInstance();
