import loginPageTpl from "./LoginPageTpl";
import Component from "../../services/Component";
import LoginForm from "../../blocks/login/LoginForm";
import Button from "../../components/button/Button";
import Router from "../../services/Router";

export default class LoginPage extends Component {
    render() {
        const loginForm = new LoginForm('', {isFragment: true});
        const registrationBtn = new Button( '', {
            text: 'Зарегистрироваться',
            classes: 'login__registration_button',
            type: 'submit',
            isFragment: true,
            events: {
                click: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    Router.go('/sign-up');
                }
            }
        });
        return this.compile(loginPageTpl, {
            children: {
                loginForm: loginForm,
                registrationBtn: registrationBtn
            },
        });
    }
}
