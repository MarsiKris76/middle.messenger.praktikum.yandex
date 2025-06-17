import Handlebars from "handlebars";
import Component from "../../services/Component";
import messageTpl from "./MessageTpl";

Handlebars.registerHelper('getMessageDirection', function(isOutgoing) {
    return isOutgoing ? 'message-feed__message--outgoing' : 'message-feed__message--incoming';
});

export default class Message extends Component {
    render() {
        return this.compile(messageTpl);
    }
}
