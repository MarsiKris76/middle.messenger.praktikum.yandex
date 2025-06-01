import {BaseAPI} from "./BaseAPI";

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

}

export default UserAPI.getInstance();
