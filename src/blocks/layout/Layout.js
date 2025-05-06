import layoutTpl from "./LayoutTpl.js";
import Component from "../../services/Component.js";

export default class Layout extends Component {
    render() {
        return this.compile(layoutTpl);
    }
}