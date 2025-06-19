import Component from "../../services/Component";
import registrationPageTpl from "./RegistrationPageTpl";
import RegistrationForm from "../../blocks/registration/RegistrationForm";
import LoginAPI from "../../api/LoginAPI";
import {SignUpRequest} from "../../type/Types";
import {checkForm} from "../../utils/Validation";

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
                    LoginAPI.signup(data as SignUpRequest).then(LoginAPI.getUser);
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
