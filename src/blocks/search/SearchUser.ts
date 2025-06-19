import Component from "../../services/Component";
import searchUserTpl from "./SearchUserTpl";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import UserAPI from "../../api/UserAPI";
import UserItem from "../../components/user_item/UserItem";
import ChatAPI from "../../api/ChatAPI";
import Store from "../../services/Store";

export default class SearchUser extends Component {

    addEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            if (this._element?.children[1])
                this._element.children[1].addEventListener(eventsName, events[eventsName]);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            if (this._element?.children[1])
                this._element.children[1].removeEventListener(eventsName, events[eventsName]);
        });
    }

    render() {
        const chatID = window.location.href.split('user/')[1];
        ChatAPI.getChatUsers(window.location.href.split('user/')[1]).then((chatUsersResponse) => {
            chatUsersResponse.forEach((chatUser) => {
                Store.saveChatUser(chatID, String(chatUser.id));
            });
        }).catch(); //ни чего не делаем. Даже не грустим.
        const userName = new Input('section', {
            type: 'text', name: 'userLogin', placeholder: 'Укажите логин для поиска...',
            attr: {
                'class': 'search__inputs_row',
            }
        });
        const searchBtn = new Button('section', {
            text: 'Найти пользователя',
            type: 'submit',
            attr: {
                'class': 'search__submit',
            },
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const userInput = document.querySelector('input[name="userLogin"]') as HTMLInputElement;
                    const searchResultPanel = document.querySelector('.search__result') as HTMLElement;
                    if (userInput && searchResultPanel) {
                        UserAPI.searchUsers({login: userInput.value}).then(data => {
                            if (Array.isArray(data) && data.length > 0) {
                                searchResultPanel.innerHTML = '';
                                data.forEach((u) => {
                                    const userElement = new UserItem('', {
                                        isFragment: true,
                                        id: u.id,
                                        login: u.login,
                                        first_name: u.first_name,
                                        second_name: u.second_name,
                                        isActive: Store.checkChatUser(window.location.href.split('user/')[1], String(u.id)) ? '--active' : ''
                                    });
                                    searchResultPanel.append(userElement.render())
                                });
                            } else {
                                searchResultPanel.innerHTML = 'Таких пользователей не нашлось... :(';
                            }
                        }).catch(() => alert('Ошибка поиска.'));
                    }
                }
            }
        });
        return this.compile(searchUserTpl, {
            children: {
                userName: userName,
                searchBtn: searchBtn
            }
        });
    }
}
