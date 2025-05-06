import Component from "../../services/Component.js";
import profilePageTpl from "./ProfilePageTpl.js";
import Avatar from "../../components/avatar/Avatar.js";
import Button from "../../components/button/Button.js";
import Input from "../../components/input/Input.js";
import ChangePasswordForm from "../../blocks/profile/ChangePasswordForm.js";
import ChangeProfileForm from "../../blocks/profile/ChangeProfileForm.js";

export default class ProfilePage extends Component {
    render() {
        const avatar = new Avatar('', {
            src: '../resources/404_image.jpg',
            alt_text: 'Картинка профиля',
            isFragment: true
        });
        const avatarSelectBtn = new Button('', {
            text: 'Выбрать аватар',
            isFragment: true
        });
        const avatarInput = new Input('', {
            type: 'file', name: 'avatar', accept: 'image/*', classes: 'avatar__input',
            isFragment: true
        });
        const changePasswordForm = new ChangePasswordForm('', {isFragment: true});
        const changeProfileForm = new ChangeProfileForm('', {isFragment: true});
        return this.compile(profilePageTpl, {
            children: {
                avatar: avatar,
                avatarSelectBtn: avatarSelectBtn,
                avatarInput: avatarInput,
                changePasswordForm: changePasswordForm,
                changeProfileForm: changeProfileForm
            }
        });
    }
}