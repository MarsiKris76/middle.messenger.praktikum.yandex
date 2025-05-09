import Component from "../../services/Component";
import linkTpl from "./LinkTpl";

export default class Link extends Component {
    render() {
        return this.compile(linkTpl);
    }
}