import Component from "../../services/Component";
import registrationPageTpl from "./RegistrationPageTpl";
import RegistrationForm from "../../blocks/registration/RegistrationForm";
import LoginAPI from "../../api/LoginAPI";
import {LoginRequest, SignUpRequest} from "../../type/Types";
import {checkForm} from "../../utils/Validation";
import {loginUser} from "../../utils/Utils";

export default class RegistrationPage extends Component {
    render() {
        const registrationForm = new RegistrationForm('', {
            isFragment: true,
            events: {
                submit: (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const form = event.target as HTMLFormElement;
                    if (checkForm(form)) return; // если есть ошибки валидации, то дальше не продолжаем.
                    const data = Object.fromEntries(new FormData(form));
                    LoginAPI.signup(data as SignUpRequest).then(() => {
                        loginUser(<LoginRequest>{login: data.login, password: data.password})
                    });
                }
            }
        });
        return this.compile(registrationPageTpl, {
            children: {
                registrationForm: registrationForm
            }
        });
    }
}
