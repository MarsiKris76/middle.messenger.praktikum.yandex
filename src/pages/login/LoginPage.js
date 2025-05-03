import loginPageTpl from "./LoginPageTpl.js";
import Component from "../../services/Component.js";
import LoginForm from "../../blocks/login/LoginForm.js";
import Button from "../../components/button/Button.js";

export default class LoginPage extends Component {
    render() {
        const loginForm = new LoginForm('', {isFragment: true})
        const registrationBtn = new Button( '', {
            text: 'Зарегистрироваться',
            classes: 'login__registration_button',
            type: 'submit',
            isFragment: true
        });
        return this.compile(loginPageTpl, {
            children: {
                loginForm: loginForm,
                registrationBtn: registrationBtn
            }
        })
    }
}