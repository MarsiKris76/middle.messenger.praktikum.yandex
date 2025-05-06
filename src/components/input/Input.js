import Component from "../../services/Component.js";
import inputTpl from "./InputTpl.js";

export default class Input extends Component {
    render() {
        return this.compile(inputTpl);
    }
}