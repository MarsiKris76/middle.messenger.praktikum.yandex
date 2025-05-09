import Component from "../../services/Component";
import registrationPageTpl from "./RegistrationPageTpl";
import RegistrationForm from "../../blocks/registration/RegistrationForm";

export default class RegistrationPage extends Component {
    render() {
        const registrationForm = new RegistrationForm('', {isFragment: true})
        return this.compile(registrationPageTpl, {
            children: {
                registrationForm: registrationForm
            }
        });
    }
}