import Component from "../../services/Component";
import chatItems from "./ChatListTpl";
import ChatItem from "../../components/chat_item/ChatItem";
import ChatAPI from "../../api/ChatAPI";
import Store from "../../services/Store";

export default class ChatList extends Component {
    private chatArr: ChatItem[] = [];
    render() {
        ChatAPI.getChats({}).then(chats => {
            const chatsPanel = document.querySelector('.messenger__chat-list');
            if (chatsPanel) {
                chats.forEach(c => {
                    Store.saveChats(JSON.stringify(c));
                    const chat = new ChatItem('', {
                        isFragment: true, id: 'chat_' + c.id ,name: c.title, text: c.last_message || '...',
                    });
                    this.chatArr.push(chat);
                    chatsPanel.append(chat.render());
                });
            }
        });
        return this.compile(chatItems, {
            list: {
                chatItems: this.chatArr
            }
        });
    }

}
