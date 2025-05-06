import Component from "../../services/Component.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";
import changePasswordForm from "./ChangePasswordTpl.js";

export default class ChangePasswordForm extends Component {
    render() {
        const newPassword = new Input('', {
            type: 'password', name: 'newPassword', placeholder: 'Пароль',
            isFragment: true
        });
        const reNewPassword = new Input('', {
            type: 'password', name: 're-newPassword', placeholder: 'Повторите пароль',
            isFragment: true
        });
        const oldPassword = new Input('', {
            type: 'password', name: 'oldPassword', placeholder: 'Старый пароль',
            isFragment: true
        });
        const submitBtn = new Button('', {
            text: 'Сменить пароль',
            type: 'submit',
            isFragment: true
        });

        return this.compile(changePasswordForm, {
            children: {
                newPassword: newPassword,
                re_newPassword: reNewPassword,
                oldPassword: oldPassword,
                submitBtn: submitBtn
            }
        });
    }
}
