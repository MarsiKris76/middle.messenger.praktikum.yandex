import Component from "../../services/Component";
import avatarTpl from "./AvatarTpl";

export default class Avatar extends Component {
    render() {
        return this.compile(avatarTpl);
    }
}