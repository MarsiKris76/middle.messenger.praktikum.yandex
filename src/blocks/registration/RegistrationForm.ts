import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import registrationFormTpl from "./RegistrationFormTpl";
import {
    emailValidation,
    loginValidation,
    nameValidation,
    passwordValidation,
    phoneValidation
} from "../../utils/validation";

export default class RegistrationForm extends Component {

    render() {
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин',
            events: {blur: loginValidation},
            isFragment: true
        });
        const passwordInput = new Input('', {
            type: 'password', name: 'password', placeholder: 'Пароль',
            events: {blur: passwordValidation},
            isFragment: true
        });
        const rePasswordInput = new Input('', {
            type: 'password', name: 're-password', placeholder: 'Повторите пароль',
            events: {blur: passwordValidation},
            isFragment: true
        });
        const firstName = new Input('', {
            type: 'text', name: 'first_name', placeholder: 'Имя',
            events: {blur: nameValidation},
            isFragment: true
        });
        const secondName = new Input('', {
            type: 'text', name: 'second_name', placeholder: 'Фамилия',
            events: {blur: nameValidation},
            isFragment: true
        });
        const email = new Input('', {
            type: 'email', name: 'email', placeholder: 'Электронный адрес',
            events: {blur: emailValidation},
            isFragment: true
        });
        const phone = new Input('', {
            type: 'text', name: 'phone', placeholder: 'Телефон',
            events: {blur: phoneValidation},
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
        });
    }
}
