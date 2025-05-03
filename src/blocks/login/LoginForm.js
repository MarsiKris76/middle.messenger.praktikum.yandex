import Component from "../../services/Component.js";
import loginFormTpl from "./LoginFormTpl.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";

export default class LoginForm extends Component {

    render() {
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин',
            isFragment: true
        });
        const passwordInput = new Input('', {
            type: 'password', name: 'password', placeholder: 'Пароль',
            isFragment: true
        });
        const submitBtn = new Button('', {
            text: 'Войти',
            isFragment: true
        });

        return this.compile(loginFormTpl, {
            children: {
                login: loginInput,
                password: passwordInput,
                submitBtn: submitBtn
            }
        })
    }
}