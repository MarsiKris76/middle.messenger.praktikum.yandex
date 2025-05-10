import Handlebars from "handlebars";
import Component from "../../services/Component";
import messageTpl from "./MessageTpl";

Handlebars.registerHelper('getMessageDirection', function(isIncoming) {
    return isIncoming ? 'message-feed__message--incoming' : 'message-feed__message--outgoing';
});

export default class Message extends Component {
    render() {
        return this.compile(messageTpl, {
            text: 'Message Message Message Message',
            isIncoming: false
        });
    }
}
