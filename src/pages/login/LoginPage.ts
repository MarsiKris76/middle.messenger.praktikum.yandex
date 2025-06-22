import loginPageTpl from "./LoginPageTpl";
import Component from "../../services/Component";
import LoginForm from "../../blocks/login/LoginForm";
import Button from "../../components/button/Button";
import Router from "../../services/Router";
import LoginAPI from "../../api/LoginAPI";
import {ErrorResponse, LoginRequest} from "../../type/Types";
import {checkForm} from "../../utils/Validation";
import Store from "../../services/Store";

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
                    LoginAPI.login(data as LoginRequest).then(r => {
                        if (r as string === 'OK') {
                            getUserInfo();
                        }
                    }).catch((e) => {
                        const error = e as ErrorResponse
                        if (error.response?.reason && error.response.reason === 'User already in system') {
                            getUserInfo();
                        }
                        else
                            alert('Проверьте логин или пароль.');
                    });
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

function getUserInfo() {
    LoginAPI.getUser().then((u) => {
        if (!u.id)
            throw new Error("Ошибка получения данных о пользователе.");
        Store.setAuthenticate();
        Store.saveUser(JSON.stringify(u));
        Router.go('/messenger');
    });
}
