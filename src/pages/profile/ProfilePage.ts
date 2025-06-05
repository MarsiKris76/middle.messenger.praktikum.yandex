import Component from "../../services/Component";
import profilePageTpl from "./ProfilePageTpl";
import Avatar from "../../components/avatar/Avatar";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ChangePasswordForm from "../../blocks/profile/ChangePasswordForm";
import ChangeProfileForm from "../../blocks/profile/ChangeProfileForm";
import {checkForm} from "../../utils/Validation";
import {ChangePasswordRequest, ChangeUserRequest} from "../../type/Types";
import UserAPI from "../../api/UserAPI";
import {getProp} from "../../utils/Utils";
import Store from "../../services/Store";

const imagePath = new URL('../../resources/404_image.jpg', import.meta.url).href;
export default class ProfilePage extends Component {

    render() {
        const storedProfile = Store.getUser();
        const profile = storedProfile ? JSON.parse(storedProfile) : null;
        const avatarLink = getProp('avatar', profile);
        const avatar = new Avatar('div', {
            src: avatarLink === '' ? imagePath : 'https://ya-praktikum.tech/api/v2/resources/' + avatarLink,
            alt_text: 'Картинка профиля',
        });
        const avatarSelectBtn = new Button('', {
            text: 'Выбрать аватар',
            isFragment: true,
            events: {
                click: () => {
                    const fileInput = document.getElementById('avatar-input') as HTMLInputElement;
                    if (fileInput) {
                        fileInput.click();
                    }
                }
            }
        });
        const avatarInput = new Input('', {
            type: 'file', name: 'avatar', accept: 'image/*', classes: 'avatar__input', id: 'avatar-input',
            isFragment: true,
            events: {
                change: (event) => {
                    const input = event.target as HTMLInputElement;
                    const file = input.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('avatar', file);
                    UserAPI.changeUserAvatar(formData).then(u => {
                        Store.saveUser(JSON.stringify(u));
                        const storedProfile = Store.getUser();
                        const profile = storedProfile ? JSON.parse(storedProfile) : null;
                        const avatarLink = getProp('avatar', profile);
                        avatar.setProps({src: avatarLink === '' ? imagePath : 'https://ya-praktikum.tech/api/v2/resources/' + avatarLink});
                    }).catch(() => alert('Ошибка изменения аватара.'));
                }
            }
        });
        const changePasswordForm = new ChangePasswordForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    if (checkForm(form)) return; // если есть ошибки валидации, то дальше не продолжаем.
                    const data = Object.fromEntries(new FormData(form));
                    UserAPI.changeUserPassword(data as ChangePasswordRequest).then(r => {
                        if (r as string === 'OK') {
                            alert('Пароль успешно изменён.');
                        }
                    }).catch(() => {
                        alert('Проверьте данные.');
                    });
                }
            }
        });
        const changeProfileForm = new ChangeProfileForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    if (checkForm(form)) return; // если есть ошибки валидации, то дальше не продолжаем.
                    const data = Object.fromEntries(new FormData(form));
                    UserAPI.changeUserProfile(data as ChangeUserRequest).then(u => {
                        Store.saveUser(JSON.stringify(u));
                        alert('Профиль успешно изменён.');
                    }).catch(() => {
                        alert('Проверьте данные.');
                    });
                }
            }
        });
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
