import Component from "../../services/Component";
import Cross from "../icons/Cross";
import userItemTpl from "./UserItemTpl";
import ChatAPI from "../../api/ChatAPI";
import Store from "../../services/Store";

export default class UserItem extends Component {
    render() {
        const cross = new Cross('div', {
            attr: {
                'title': 'Удалить пользователя из чата',
            },
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!(event.target instanceof Element))
                        return;
                    const ec = event.target;
                    const userItem = ec.closest('div[data-user-id]') as HTMLElement | null;
                    if (userItem) {
                        const chatID = window.location.href.split('user/')[1];
                        ChatAPI.kickUsersFromChats({
                            chatId: chatID,
                            users: [userItem.dataset.userId ?? '-1']
                        }).then(() => {
                            Store.removeChatUser(chatID, userItem.dataset.userId ?? '-1')
                            userItem.classList.remove('search__user-item--active');
                            userItem.classList.add('search__user-item');
                        }).catch(() => {
                            alert('Ошибка удаления пользователя из чата. Обновите страницу.');
                        });
                    }
                }
            }
        });
        return this.compile(userItemTpl, {
            children: {
                crossIcon: cross,
            }
        });
    }
}
