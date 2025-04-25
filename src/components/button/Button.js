import Block from "../block";
// Ваш реализованный шаблонизатор
import { compile } from "../../utils/templator";
import { template } from "./template";

export default class Button extends Block {
    constructor(props) {
        // Создаём враппер DOM-элемент button
        super("button", props);
    }

    render() {
        const { text } = this.props;
        return template({ text });
    }
}