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

    getUser() {
        return localStorage.getItem('user');
    }

    public setAuthenticate() {
        localStorage.setItem('isAuthenticated', 'true');
    }

    public removeAuthenticate() {
        localStorage.removeItem('isAuthenticated');
    }

    isAuthenticate() {
        return !!localStorage.getItem('isAuthenticated');
    }

}

export default Store.getInstance();
