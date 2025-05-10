import Component from "../../services/Component";
import chatItemTpl from "./ChatItemTpl";
import Avatar from "../avatar/Avatar";

const imagePath = new URL('../../resources/404_image.jpg', import.meta.url).href;
// нужна будет реализация с передачей параметров
export default class ChatItem extends Component {
    render() {

        const avatar = new Avatar('', {
            src: imagePath,
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
