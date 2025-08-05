import Component from "../../services/Component";
import chatItemTpl from "./ChatItemTpl";
import DeleteIcon from "../icons/Delete";
import ChatAPI from "../../api/ChatAPI";
import Router from "../../services/Router";
import ListUsersIcon from "../icons/ListUsers";

export default class ChatItem extends Component {
    render() {
        const deleteIcon = new DeleteIcon('div', {
            attr: {
                'title': 'Удалить',
            },
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!(event.target instanceof Element))
                        return;
                    const ec = event.target;
                    const chatItem = ec.closest('.chat-item') as HTMLElement | null;
                    if (chatItem) {
                        const chatIdAtr = chatItem.getAttribute('id');
                        const chatId = chatIdAtr ? chatIdAtr.substring(5) : '';
                        ChatAPI.deleteChats({chatId}).then(() => {
                            const delChat = document.getElementById('chat_' + chatId);
                            if (delChat) {
                                delChat.remove();
                            }
                        }).catch(() => {
                            alert('Ошибка удаления чата. Обновите страницу.');
                        });
                    }
                }
            }
        });

        const addUserIcon = new ListUsersIcon('div', {
            attr: {
                'title': 'Список пользователей чата',
            },
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!(event.target instanceof Element))
                        return;
                    const ec = event.target;
                    const chatItem = ec.closest('.chat-item') as HTMLElement | null;
                    if (chatItem) {
                        const chatIdAtr = chatItem.getAttribute('id');
                        const chatId = chatIdAtr ? chatIdAtr.substring(5) : '';
                        Router.go('/list-chat-user/' + chatId);
                    }

                }
            }
        });

        return this.compile(chatItemTpl, {
            children: {
                deleteChat: deleteIcon,
                addUser: addUserIcon
            }
        });
    }

}
