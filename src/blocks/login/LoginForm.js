import Component from "../../services/Component.js";
import loginFormTpl from "./LoginFormTpl.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";

export default class LoginForm extends Component {

    render() {
        const loginInput = new Input('section', {
            type: 'text', name: 'login', text: 'Логин',
            attr: {
                'class':'registration__inputs_row'
            }
        });
        const passwordInput = new Input('section', {
            type: 'password', name: 'password', text: 'Пароль',
            attr: {
                'class':'registration__inputs_row'
            }
        });
        const submitBtn = new Button('asd', {
            text: 'Войти',
            attr: {
                'class':'login__submit'
            }
        });

        return this.compile(loginFormTpl, {
            children: {
                login: loginInput,
                password : passwordInput,
                submitBtn : submitBtn,
            },
            attr: {
                'action':'/auth/signin',
                'method':'post',
                'class':'login__form'
            },

        })
    }
}