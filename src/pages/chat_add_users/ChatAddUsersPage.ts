import Component from "../../services/Component";
import Router from "../../services/Router";
import Button from "../../components/button/Button";
import chatAddUsersPageTpl from "./ChatAddUsersPageTpl";
import SearchUser from "../../blocks/search/SearchUser";
import ChatAPI from "../../api/ChatAPI";
import Store from "../../services/Store";

export default class ChatAddUsersPage extends Component {
    render() {
        const searchUser = new SearchUser('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const ec = event.target as HTMLElement;
                    const userItem = ec.closest('div[data-user-id]') as HTMLElement | null;
                    if (userItem) {
                        const chatID = window.location.href.split('user/')[1];
                        ChatAPI.addUsersToChats({chatId: chatID, users: [userItem.dataset.userId ?? '-1']}).then(() => {
                            Store.saveChatUser(chatID, userItem.dataset.userId ?? '-1');
                            userItem.classList.add('search__user-item--active');
                            userItem.classList.remove('search__user-item');
                        }).catch(() => {
                            alert('Ошибка добавления пользователя в чат. Обновите страницу.');
                        });
                    }
                }
            }
        });
        const cancelBtn = new Button('', {
            text: 'Отмена',
            isFragment: true,
            classes: 'search__cancel',
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    Router.go('/messenger');
                }
            }
        });
        return this.compile(chatAddUsersPageTpl, {
            children: {
                searchUser: searchUser,
                cancelBtn: cancelBtn
            },
        });
    }
}
