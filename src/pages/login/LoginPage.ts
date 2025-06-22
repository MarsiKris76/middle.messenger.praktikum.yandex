import loginPageTpl from "./LoginPageTpl";
import Component from "../../services/Component";
import LoginForm from "../../blocks/login/LoginForm";
import Button from "../../components/button/Button";
import Router from "../../services/Router";
import {LoginRequest} from "../../type/Types";
import {checkForm} from "../../utils/Validation";
import {loginUser} from "../../utils/Utils";

export default class LoginPage extends Component {
    render() {
        const loginForm = new LoginForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    if (checkForm(form)) return; // если есть ошибки валидации, то дальше не продолжаем.
                    const data = Object.fromEntries(new FormData(form));
                    loginUser(data as LoginRequest);
                }
            }
        });
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
