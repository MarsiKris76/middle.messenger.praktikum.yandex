import Component from "../../services/Component.js";
import registrationPageTpl from "./RegistrationPageTpl.js";
import RegistrationForm from "../../blocks/registration/RegistrationForm.js";

export default class RegistrationPage extends Component {
    render() {
        const registrationForm = new RegistrationForm('', {isFragment: true})
        return this.compile(registrationPageTpl, {
            children: {
                registrationForm: registrationForm
            }
        })
    }
}