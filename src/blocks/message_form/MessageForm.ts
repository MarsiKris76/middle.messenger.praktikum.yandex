import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import messageFormTpl from "./MessageFormTpl";
import {emptyValidation} from "../../utils/Validation";

export default class MessageForm extends Component {

    render() {
        const messageInput = new Input('', {
            type: 'text', name: 'message', placeholder: 'Введите своё сообщение...',
            events: {blur: emptyValidation},
            isFragment: true
        });
        const submitBtn = new Button('', {
            text: 'Отправить',
            type: 'submit',
            isFragment: true
        });

        return this.compile(messageFormTpl, {
            children: {
                messageInput: messageInput,
                submitBtn: submitBtn
            }
        });
    }
}
