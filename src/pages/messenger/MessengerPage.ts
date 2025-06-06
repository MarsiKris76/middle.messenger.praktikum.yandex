import Component from "../../services/Component";
import messengerPageTpl from "./MessengerPageTpl";
import Message from "../../components/message/Message";
import MessageForm from "../../blocks/message_form/MessageForm";
import ToolPanel from "../../blocks/tool_panel/ToolPanel";
import ChatList from "../../blocks/chat/ChatList";

export default class MessengerPage extends Component {
    render() {
        const message1 = new Message('', {isFragment: true});
        const message2 = new Message('', {isFragment: true});
        const message3 = new Message('', {isFragment: true});
        const messages = [message1, message2, message3];
        const messageForm = new MessageForm('', {isFragment: true});
        const chatList = new ChatList('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const ec = event.target as HTMLElement;
                    const chatItem = ec.closest('.chat-item') as HTMLElement | null;
                    if (chatItem) {
                        document.querySelectorAll('.chat-item').forEach(el => {
                            el.classList.remove('chat-item--active');
                        });
                        chatItem.classList.add('chat-item--active');
                    }
                }
            }
        });
        const toolPanel = new ToolPanel('div', {
            attr: {
                'class':'sidebar'
            }
        });
        return this.compile(messengerPageTpl, {
            children: {
                toolPanel: toolPanel,
                chatList: chatList,
                messageForm: messageForm
            },
            list: {
                messages: messages,
            }
        });
    }
}
