import Component from "../../services/Component.js";
import chatItemTpl from "./ChatItemTpl.js";
import Avatar from "../avatar/Avatar.js";

// нужна будет реализация с передачей параметров
export default class ChatItem extends Component {
    render() {

        const avatar = new Avatar('', {
            src: '../resources/404_image.jpg',
            alt_text: 'Картинка профиля',
            classes: 'messenger__chat-avatar',
            isFragment: true,
        });

        return this.compile(chatItemTpl, {
            children: {
                avatar: avatar
            },
            name: 'Имя Человека',
            text: 'Текст последнего сообщения'
        });
    }
}
