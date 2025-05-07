import Component from "../../services/Component.js";
import messengerPageTpl from "./MessengerPageTpl.js";
import ChatItem from "../../components/chat_item/ChatItem.js";
import Message from "../../components/message/Message.js";
import MessageForm from "../../blocks/message_form/MessageForm.js";

export default class MessengerPage extends Component {
    render() {
        const chatItem1 = new ChatItem('', {isFragment: true});
        const chatItem2 = new ChatItem('', {isFragment: true});
        const chatItem3 = new ChatItem('', {isFragment: true});
        const message1 = new Message('', {isFragment: true});
        const message2 = new Message('', {isFragment: true});
        const message3 = new Message('', {isFragment: true});
        const messages = [message1, message2, message3];
        const chatItems = [chatItem1, chatItem2, chatItem3];
        const messageForm = new MessageForm('', {isFragment: true});
        return this.compile(messengerPageTpl, {
            children: {
                messageForm: messageForm
            },
            list: {
                messages: messages,
                chatItems: chatItems,
            }
        });
    }
}