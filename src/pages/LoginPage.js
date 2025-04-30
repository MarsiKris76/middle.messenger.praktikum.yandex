import loginPageTpl from "./LoginPageTpl.js";
import Component from "../services/Component.js";
import LoginForm from "../blocks/login/LoginForm.js";
import Button from "../components/button/Button.js";

export default class LoginPage extends Component {
    render() {
        const loginForm = new LoginForm(undefined)
        const registrationBtn = new Button( undefined, {
            text: 'Зарегистрироваться',
            classes: 'login__registration_button'
        });
        return this.compile(loginPageTpl, {
            children: {
                loginForm: loginForm,
                registrationBtn: registrationBtn
            },
            attr: {
                'class':'login'
            }
        })
    }
}