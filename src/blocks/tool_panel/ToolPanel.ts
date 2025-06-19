import toolPanelTpl from "./ToolPanelTpl";
import Component from "../../services/Component";
import ProfileIcon from "../../components/icons/ProfileIcon";
import ExitIcon from "../../components/icons/ExitIcon";
import AddChatIcon from "../../components/icons/AddChat";
import Router from "../../services/Router";
import LoginAPI from "../../api/LoginAPI";
import Store from "../../services/Store";

export default class ToolPanel extends Component {
    render() {
        const profileIcon = new ProfileIcon('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    Router.go('/settings');
                }
            }
        });
        const addChatIcon = new AddChatIcon('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    Router.go('/new-chat')
                }
            }
        });
        const exitIcon = new ExitIcon('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    LoginAPI.logout().then((r) => {
                        if (r as string === 'OK') {
                            Store.removeAuthenticate();
                            Store.removeUser();
                            Router.go('/')
                        }
                    });
                }
            }
        });
        return this.compile(toolPanelTpl,{
            children: {
                profileIcon: profileIcon,
                exitIcon: exitIcon,
                addChatIcon: addChatIcon,
            }
        });
    }
}
