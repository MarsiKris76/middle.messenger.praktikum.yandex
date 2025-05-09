import layoutTpl from "./LayoutTpl";
import Component from "../../services/Component";

export default class Layout extends Component {
    render() {
        return this.compile(layoutTpl);
    }
}