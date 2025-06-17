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

let messagesPanel: Element | null = null;

function showMessage(massageText: string, isOutgoing: boolean) {
    const massage = new Message('', {isFragment: true, text: massageText, isOutgoing: isOutgoing}).render();
    if (messagesPanel) {
        messagesPanel.append(massage);
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
                        document.querySelectorAll('.chat-item--active').forEach(el => {
                            el.classList.remove('chat-item--active');
                        });
                        chatItem.classList.add('chat-item--active');
                        const chatID = chatItem.id.substring(5);
                        messagesPanel = document.querySelector('.messenger__message-feed');
                        if (messagesPanel)
                            messagesPanel.innerHTML = '';
                        ChatSocket.connect(chatID, getProp('id', Store.getUser()), showMessage);
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
            }
        });
    }
}
