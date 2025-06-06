import Component from "../../services/Component";
import Router from "../../services/Router";
import Button from "../../components/button/Button";
import searchUserPageTpl from "./SearchUserPageTpl";
import SearchUser from "../../blocks/search/SearchUser";

export default class SearchUserPage extends Component {
    render() {
        const searchUser = new SearchUser('', {
            isFragment: true,
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
        return this.compile(searchUserPageTpl, {
            children: {
                searchUser: searchUser,
                cancelBtn: cancelBtn
            },
        });
    }
}
