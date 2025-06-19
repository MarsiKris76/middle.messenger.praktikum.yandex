import Component from "../../services/Component";
import Router from "../../services/Router";
import { CreateChatRequest } from "../../type/Types";
import chatCreaturePageTpl from "./ChatCreaturePageTpl";
import CreatureChatForm from "../../blocks/chat/CreatureChatForm";
import ChatAPI from "../../api/ChatAPI";
import Button from "../../components/button/Button";

export default class ChatCreaturePage extends Component {
    render() {
        const chatCreatureForm = new CreatureChatForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    const data = Object.fromEntries(new FormData(form));
                    ChatAPI.createChat(data as CreateChatRequest).then(r => {
                        if (r) {
                            Router.go('/messenger');
                        }
                    }).catch(() => {
                        alert('Что-то пошло не так... :(');
                        Router.go('/messenger');
                    });
                }
            }
        });
        const cancelBtn = new Button( '', {
            text: 'Отмена',
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    Router.go('/messenger');
                }
            }
        });
        return this.compile(chatCreaturePageTpl, {
            children: {
                chatCreatureForm: chatCreatureForm,
                cancelBtn: cancelBtn
            },
        });
    }
}
