import Component from "../../services/Component.js";
import Input from "../../components/input/Input.js";
import Button from "../../components/button/Button.js";
import messageFormTpl from "./MessageFormTpl.js";

export default class MessageForm extends Component {

    render() {
        const messageInput = new Input('', {
            type: 'text', name: 'message', placeholder: 'Введите своё сообщение...',
            isFragment: true
        });
        const submitBtn = new Button('', {
            text: 'Отправить',
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