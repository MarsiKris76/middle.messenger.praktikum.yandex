import Component from "../../services/Component.js";
import avatarTpl from "./AvatarTpl.js";

export default class Avatar extends Component {
    render() {
        return this.compile(avatarTpl)
    }
}