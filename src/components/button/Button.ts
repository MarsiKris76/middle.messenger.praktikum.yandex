import Component from "../../services/Component";
import buttonTpl from "./ButtonTpl";

export default class Button extends Component {
    render() {
        return this.compile(buttonTpl);
    }
}