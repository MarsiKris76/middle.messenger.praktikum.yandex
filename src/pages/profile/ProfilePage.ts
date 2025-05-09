import Component from "../../services/Component";
import profilePageTpl from "./ProfilePageTpl";
import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ChangePasswordForm from "../../blocks/profile/ChangePasswordForm";
import ChangeProfileForm from "../../blocks/profile/ChangeProfileForm";

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
