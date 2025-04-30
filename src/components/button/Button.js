import Component from "../../services/Component.js";
import buttonTpl from "./ButtonTpl.js";

export default class Button extends Component {
    render() {
        return this.compile(buttonTpl)
    }
}