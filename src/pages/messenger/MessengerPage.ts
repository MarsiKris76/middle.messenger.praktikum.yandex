import Component from "../../services/Component";
import messengerPageTpl from "./MessengerPageTpl";
import ChatItem from "../../components/chat_item/ChatItem";
import Message from "../../components/message/Message";
import MessageForm from "../../blocks/message_form/MessageForm";

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