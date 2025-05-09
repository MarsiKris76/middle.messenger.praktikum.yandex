import Component from "../../services/Component";
import inputTpl from "./InputTpl";

export default class Input extends Component {
    render() {
        return this.compile(inputTpl);
    }

    addEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            if (this._element?.children[0])
                this._element.children[0].addEventListener(eventsName, events[eventsName]);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;
        Object.keys(events).forEach( (eventsName) => {
            if (this._element?.children[0])
                this._element.children[0].removeEventListener(eventsName, events[eventsName]);
        })
    }
}
