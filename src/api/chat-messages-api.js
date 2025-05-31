// chat-messages-api.js
import HTTP from 'modules/http';
import {BaseAPI} from "./BaseAPI.ts";

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

class ChatMessagesAPI extends BaseAPI {
    request({id}) {
        return chatMessagesAPIInstance.get(`/${id}`);
    }
}
