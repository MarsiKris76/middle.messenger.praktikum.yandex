import toolPanelTpl from "./ToolPanelTpl";
import Component from "../../services/Component";
import ProfileIcon from "../../components/icons/ProfileIcon";
import ExitIcon from "../../components/icons/ExitIcon";
import Router from "../../services/Router";
import LoginAPI from "../../api/LoginAPI";

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
        const exitIcon = new ExitIcon('', {
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    LoginAPI.logout().then((r) => {
                        if (r as string === 'OK') {
                            localStorage.removeItem('isAuthenticated');
                            localStorage.removeItem('user');
                            Router.go('/')
                        }
                    });
                }
            }
        });
        return this.compile(toolPanelTpl,{
            children: {
                profileIcon: profileIcon,
                exitIcon: exitIcon
            }
        });
    }
}
