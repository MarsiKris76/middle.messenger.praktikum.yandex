import Component from "../../services/Component";
import messengerPageTpl from "./MessengerPageTpl";
import Message from "../../components/message/Message";
import MessageForm from "../../blocks/message_form/MessageForm";
import ToolPanel from "../../blocks/tool_panel/ToolPanel";
import ChatList from "../../blocks/chat/ChatList";
import Store from "../../services/Store";
import ChatSocket from "../../services/ChatSocket";
import {getProp} from "../../utils/Utils";
import {checkForm} from "../../utils/Validation";
import {MessageFormType} from "../../type/Types";
import MessageFeed from "../../components/message_feed/MessageFeed";

let messagesPanel: Element | null = null;
let count: number = 1;

function showMessage(massageText: string, isOutgoing: boolean, isOld?: boolean) {
    const massage = new Message('', {isFragment: true, text: massageText, isOutgoing: isOutgoing}).render();
    if (messagesPanel) {
        if (isOld) {
            messagesPanel.prepend(massage);
            if (count === 1) {
                messagesPanel.scrollTo({
                    top: messagesPanel.scrollHeight,
                    behavior: 'smooth'
                });
            }
        } else {
            messagesPanel.append(massage);
            messagesPanel.scrollTo({
                top: messagesPanel.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
}

export default class MessengerPage extends Component {
    render() {
        const messageForm = new MessageForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    messagesPanel = document.querySelector('.messenger__message-feed');
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    if (checkForm(form)) return;
                    const data = Object.fromEntries(new FormData(form)) as MessageFormType;
                    ChatSocket.sendMessage(data.message);
                    form.reset();
                }
            }
        });
        const chatList = new ChatList('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const ec = event.target as HTMLElement;
                    const chatItem = ec.closest('.chat-item') as HTMLElement | null;
                    if (chatItem) {
                        count = 1;
                        document.querySelectorAll('.chat-item--active').forEach(el => {
                            el.classList.remove('chat-item--active');
                        });
                        chatItem.classList.add('chat-item--active');
                        const chatID = chatItem.id.substring(5);
                        messagesPanel = document.querySelector('.messenger__message-feed');
                        if (messagesPanel)
                            messagesPanel.textContent = '';
                        ChatSocket.connect(chatID, getProp('id', Store.getUser()), showMessage);
                    }
                }
            }
        });
        const messageFeed = new MessageFeed('', {
            isFragment: true,
            events: {
                scroll: () => {
                    if (messagesPanel && messagesPanel.scrollTop === 0 && messagesPanel.textContent) {
                        ChatSocket.getOldMessages(count+=20);
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
                messageFeed: messageFeed,
                messageForm: messageForm
            }
        });
    }
}
