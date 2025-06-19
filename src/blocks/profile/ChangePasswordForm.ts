import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import changePasswordForm from "./ChangePasswordTpl";
import {passwordValidation} from "../../utils/Validation";

export default class ChangePasswordForm extends Component {
    render() {
        const newPassword = new Input('', {
            type: 'password', name: 'newPassword', placeholder: 'Пароль',
            events: {blur: passwordValidation},
            isFragment: true
        });
        const reNewPassword = new Input('', {
            type: 'password', name: 're-newPassword', placeholder: 'Повторите пароль',
            events: {blur: passwordValidation},
            isFragment: true
        });
        const oldPassword = new Input('', {
            type: 'password', name: 'oldPassword', placeholder: 'Старый пароль',
            events: {blur: passwordValidation},
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
