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
        this.removeAllChatUsersInfo();
    }

    public isAuthenticate() {
        return !!localStorage.getItem('isAuthenticated');
    }

    public saveChatUser(chatNo: string, userId: string) {
        const chatUsers = localStorage.getItem('ChatUser_' + chatNo);
        if (chatUsers && chatUsers.length > 0 && !chatUsers.includes(userId)) {
            localStorage.setItem('ChatUser_' + chatNo, chatUsers + '{' + userId + '}');
        } else if (chatUsers && chatUsers.includes(userId)) {
            return;
        }
        else {
            localStorage.setItem('ChatUser_' + chatNo, '{' + userId + '}');
        }
    }

    public removeChatUser(chatNo: string, userId: string) {
        const chatUsers = localStorage.getItem('ChatUser_' + chatNo);
        if (chatUsers && chatUsers.length > 0 && chatUsers.includes('{' + userId + '}')) {
            localStorage.setItem('ChatUser_' + chatNo, chatUsers.replace('{' + userId + '}', ''));
        } else return;
    }

    public checkChatUser(chatNo: string, userId: string): boolean {
        const usersList = localStorage.getItem('ChatUser_' + chatNo);
        if (usersList) {
            return usersList.includes('{' + userId + '}');
        }
        return false;
    }

    public removeAllChatUsersInfo() {
        removeLocalStorageByPrefix('ChatUser_');
    }

}

function removeLocalStorageByPrefix(prefix: string) {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
}

export default Store.getInstance();
