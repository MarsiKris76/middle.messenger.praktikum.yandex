import Component from "../../services/Component";
import messageFeedTpl from "./MessageFeedTpl";

export default class MessageFeed extends Component {
    render() {
        return this.compile(messageFeedTpl);
    }
}
