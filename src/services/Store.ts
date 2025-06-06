class Store {
    private static __instance: Store;

    constructor() {
        if (Store.__instance)
            return Store.__instance;
        Store.__instance = this;
    }

    public static getInstance(): Store {
        if (!Store.__instance) {
            Store.__instance = new Store();
        }
        return Store.__instance;
    }

    public saveUser(userProfile: string) {
        localStorage.setItem('user', userProfile);
    }

    public removeUser() {
        localStorage.removeItem('user');
    }

    public getUser() {
        return localStorage.getItem('user');
    }

    public setAuthenticate() {
        localStorage.setItem('isAuthenticated', 'true');
    }

    public removeAuthenticate() {
        localStorage.removeItem('isAuthenticated');
    }

    public isAuthenticate() {
        return !!localStorage.getItem('isAuthenticated');
    }

    saveChats(chats: string) {
        localStorage.removeItem('chats');
        localStorage.setItem('chats', chats);
    }

    getChats() {
        return localStorage.getItem('chats');
    }

}

export default Store.getInstance();
