import {MassageFromSocket} from "../type/Types";
import ChatAPI from "../api/ChatAPI";
import Store from "./Store";
import {getProp, getUserName} from "../utils/Utils";

class ChatSocket {
    private static __instance: ChatSocket;
    private _socket: WebSocket | null = null;
    private _chatId: string | null = null;
    private _userId: string | null = null;
    private _token: string | null = null;
    private _outgoingQueue: string[] = [];
    private _isConnected = false;
    private _ping : number | null = null;

    constructor() {
        if (ChatSocket.__instance) {
            return ChatSocket.__instance;
        }
        ChatSocket.__instance = this;
    }

    public static getInstance(): ChatSocket {
        if (!ChatSocket.__instance) {
            ChatSocket.__instance = new ChatSocket();
        }
        return ChatSocket.__instance;
    }

    public connect(chatId: string, userId: string, onMessageCallback: (message: string, isOutgoing: boolean) => void) {
        if (this._chatId === chatId && this._userId === userId)
            return; // значит меня подключение не нужно
        this.stopPing();
        this.close(); // Закрываем прошлое подключение если оно есть
        ChatAPI.getChatToken(chatId).then((t) => {
            this._chatId = chatId;
            this._userId = userId;
            this._token = t.token;
            this._socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/' + this._userId + '/' + this._chatId + '/' + this._token);
            this._socket.onopen = () => {
                this._isConnected = true;
                this.sendAuthMessage();
                this._outgoingQueue.forEach(message => {
                    this._socket!.send(message);
                });
                this._outgoingQueue = [];
                this.startPing();
                this.getOldMessages();
            };

            this._socket.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data) as MassageFromSocket;
                    if (message.type && message.type === 'message' && typeof message.content === 'string')
                        onMessageCallback(message.content, String(message.user_id) === getProp('id', Store.getUser()));
                } catch (e) {
                    console.error('Не удалось разобрать сообщение:', e);
                }
            };

            this._socket.onclose = (event) => {
                console.info('WebSocket закрыт. wasClean: ', event.wasClean);
            };

            this._socket.onerror = (error) => {
                console.error('Ошибка WebSocket:', error);
            };
        });
    }

    public sendMessage(message: string) {
        if (this._isConnected) {
            const messageContent = {
                content: message,
                type: 'message'
            };
            this._socket!.send(JSON.stringify(messageContent));
        } else {
            this._outgoingQueue.push(message);
        }
    }

    private sendAuthMessage() {
        this.sendMessage(getUserName() + ' в чате.');
    }

    getOldMessages() {
        this._socket?.send(JSON.stringify({
            content: 0,
            type: 'get old',
        }));
    }

    private close() {
        if (this._socket) {
            this.sendMessage(getUserName() + ' вышел из чата.');
            this._isConnected = false;
            this._socket.close();
        }
    }

    private startPing() {
        if (this._socket && this._socket.readyState === WebSocket.OPEN) {
            this._socket.send(JSON.stringify({ type: 'ping' }));
        }
        this._ping = window.setTimeout(() => {
            this.startPing(); // рекурсивный вызов
        }, 30000);
    }

    private stopPing() {
        if (this._ping !== null) {
            clearTimeout(this._ping);
            this._ping = null;
        }
    }

}

export default ChatSocket.getInstance();
