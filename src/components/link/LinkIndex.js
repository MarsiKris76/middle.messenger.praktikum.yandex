import Component from "../../services/Component.js";
import linkTpl from "./LinkTpl.js";

export default class Link extends Component {
    render() {
        return this.compile(linkTpl)
    }
}