import Component from "../../services/Component";
import loginFormTpl from "./LoginFormTpl";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {loginValidation, passwordValidation} from "../../utils/validation";

export default class LoginForm extends Component {
    render() {
        const loginInput = new Input('section', {
            type: 'text', name: 'login', placeholder: 'Логин',
            events: {blur: loginValidation},
            attr: {'class': 'registration__inputs_row'}
        });
        const passwordInput = new Input('section', {
            type: 'password', name: 'password', placeholder: 'Пароль',
            events: {blur: passwordValidation},
            attr: {'class': 'registration__inputs_row'}
        });
        const submitBtn = new Button('section', {
            text: 'Войти',
            type: 'submit',
            attr: {'class': 'login__submit'}
        });

        return this.compile(loginFormTpl, {
            children: {
                login: loginInput,
                password: passwordInput,
                submitBtn: submitBtn,
            }
        });
    }
}