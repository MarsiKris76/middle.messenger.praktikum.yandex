import Component from "../../services/Component";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import creatureChatFormTpl from "./CreatureChatFormTpl";


export default class CreatureChatForm extends Component {

    render() {
        const chatName = new Input('section', {
            type: 'text', name: 'title', placeholder: 'Название нового чата...',
            attr: {'class': 'registration__inputs_row'}
        });
        const submitBtn = new Button('section', {
            text: 'Создать чат',
            type: 'submit',
            attr: {'class': 'creature-chat__submit'}
        });
        return this.compile(creatureChatFormTpl, {
            children: {
                chatName: chatName,
                submitBtn: submitBtn,
            }
        });
    }
}
