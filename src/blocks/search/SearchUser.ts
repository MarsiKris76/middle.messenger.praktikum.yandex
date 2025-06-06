import Component from "../../services/Component";
import searchUserTpl from "./SearchUserTpl";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import UserAPI from "../../api/UserAPI";

export default class SearchUser extends Component {
    render() {
        const userName = new Input('section', {
            type: 'text', name: 'userLogin', placeholder: 'Укажите логин для поиска...',
        });
        const searchBtn = new Button('section', {
            text: 'Найти пользователя',
            events: {
                click: () => {
                    UserAPI.searchUsers({login: 'Test76'}).then(data => {
                        console.log(data);
                    });
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
