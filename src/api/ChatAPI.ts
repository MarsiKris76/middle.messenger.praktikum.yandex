import {BaseAPI} from "./BaseAPI";
import {
    CreateChatRequest,
    CreateChatResponse,
    DeleteChatRequest,
    DeleteChatResponse,
    GetChatRequest,
    GetChatResponse
} from "../type/Types";

class ChatAPI extends BaseAPI {
    private static __instance: ChatAPI;

    constructor() {
        if (ChatAPI.__instance) {
            return ChatAPI.__instance;
        }
        super('/chats');
        ChatAPI.__instance = this;
    }

    public static getInstance(): ChatAPI {
        if (!ChatAPI.__instance) {
            ChatAPI.__instance = new ChatAPI();
        }
        return ChatAPI.__instance;
    }

    public async createChat(title: CreateChatRequest) {
        return await this.http.post<CreateChatResponse>('', {
            data: title,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async getChats(param: GetChatRequest) {
        return await this.http.get<GetChatResponse>('', {
            data: param,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    public async deleteChats(chatId: DeleteChatRequest) {
        return await this.http.delete<DeleteChatResponse>('', {
            data: chatId,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

}

export default ChatAPI.getInstance();
