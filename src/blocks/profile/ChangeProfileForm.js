import changeProfileFormTpl from "./ChangeProfileFormTpl.js";
import Component from "../../services/Component.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";


export default class ChangeProfileForm extends Component {
    render() {
        const loginInput = new Input('', {
            type: 'text', name: 'login', placeholder: 'Логин',
            isFragment: true
        });
        const displayName = new Input('', {
            type: 'text', name: 'display_name', placeholder: 'Отображаемое имя',
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
        })
    }
}
