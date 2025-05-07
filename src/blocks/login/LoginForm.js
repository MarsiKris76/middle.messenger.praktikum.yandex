import Component from "../../services/Component.js";
import loginFormTpl from "./LoginFormTpl.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";
import {isValidLogin} from "../../utils/validation.js";

function formValidation(event) {
    console.log(event.target)
    if (isValidLogin(event.target.value)) {
        event.target.classList.remove("input_base--error");
        return;
    }
    event.target.classList.add("input_base--error");
}

export default class LoginForm extends Component {

    render() {
        const loginInput = new Input('section', {
            type: 'text', name: 'login', placeholder: 'Логин',
            events: {blur: formValidation},
            attr: {'class': 'registration__inputs_row'}
        });
        const passwordInput = new Input('section', {
            type: 'password', name: 'password', placeholder: 'Пароль',
            events: {blur: formValidation},
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
            },
            events: {submit: formValidation}
        });
    }
}