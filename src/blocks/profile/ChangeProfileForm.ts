import changeProfileFormTpl from "./ChangeProfileFormTpl";
import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {emailValidation, loginValidation, nameValidation, phoneValidation} from "../../utils/Validation";


export default class ChangeProfileForm extends Component {
    render() {
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин',
            events: {blur: loginValidation},
            isFragment: true
        });
        const displayName = new Input('', {
            type: 'text', name: 'display_name', placeholder: 'Отображаемое имя',
            isFragment: true
        });
        const firstName = new Input('', {
            type: 'text', name: 'first_name', placeholder: 'Имя',
            events: {blur: nameValidation},
            isFragment: true
        });
        const secondName = new Input('', {
            type: 'text', placeholder: 'Фамилия', name: 'second_name',
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
        const submitBtn = new Button('', {
            text: 'Сохранить',
            type: 'submit',
            isFragment: true
        });

        return this.compile(changeProfileFormTpl, {
            children: {
                login: loginInput,
                display_name: displayName,
                first_name: firstName,
                second_name: secondName,
                email: email,
                phone: phone,
                submitBtn: submitBtn
            }
        });
    }
}
