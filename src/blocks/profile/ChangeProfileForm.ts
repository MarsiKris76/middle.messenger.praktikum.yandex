import changeProfileFormTpl from "./ChangeProfileFormTpl";
import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import {emailValidation, loginValidation, nameValidation, phoneValidation} from "../../utils/Validation";
import {getProp} from "../../utils/Utils";
import Store from "../../services/Store";

export default class ChangeProfileForm extends Component {
    render() {
        const storedProfile = Store.getUser();
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин', value: getProp('login', profile),
            events: {blur: loginValidation},
            isFragment: true
        });
        const displayName = new Input('', {
            type: 'text', name: 'display_name', placeholder: 'Отображаемое имя', value: getProp('display_name', profile),
            isFragment: true
        });
        const firstName = new Input('', {
            type: 'text', name: 'first_name', placeholder: 'Имя', value: getProp('first_name', profile),
            events: {blur: nameValidation},
            isFragment: true
        });
        const secondName = new Input('', {
            type: 'text', placeholder: 'Фамилия', name: 'second_name', value: getProp('second_name', profile),
            events: {blur: nameValidation},
            isFragment: true
        });
        const email = new Input('', {
            type: 'email', name: 'email', placeholder: 'Электронный адрес', value: getProp('email', profile),
            events: {blur: emailValidation},
            isFragment: true
        });
        const phone = new Input('', {
            type: 'text', name: 'phone', placeholder: 'Телефон', value: getProp('phone', profile),
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
