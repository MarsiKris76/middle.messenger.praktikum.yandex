import Component from "../../services/Component.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";
import registrationFormTpl from "./RegistrationFormTpl.js";

export default class RegistrationForm extends Component {

    render() {
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин',
            isFragment: true
        });
        const passwordInput = new Input('', {
            type: 'password', name: 'password', placeholder: 'Пароль',
            isFragment: true
        });
        const rePasswordInput = new Input('', {
            type: 'password', name: 're-password', placeholder: 'Повторите пароль',
            isFragment: true
        });
        const firstName = new Input('', {
            type: 'text', name: 'first_name', placeholder: 'Имя',
            isFragment: true
        });
        const secondName = new Input('', {
            type: 'text', name: 'second_name', placeholder: 'Фамилия',
            isFragment: true
        });
        const email = new Input('', {
            type: 'email', name: 'email', placeholder: 'Электронный адрес',
            isFragment: true
        });
        const phone = new Input('', {
            type: 'text', name: 'phone', placeholder: 'Телефон',
            isFragment: true
        });
        const submitBtn = new Button('section', {
            text: 'Зарегистрироваться',
            type: 'submit',
            isFragment: true
        });

        return this.compile(registrationFormTpl, {
            children: {
                login: loginInput,
                password: passwordInput,
                re_password: rePasswordInput,
                first_name: firstName,
                second_name: secondName,
                email: email,
                phone: phone,
                submitBtn : submitBtn,
            }
        })
    }
}