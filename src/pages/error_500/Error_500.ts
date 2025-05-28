import Component from "../../services/Component";
import error_500Tlp from "./Error_500Tpl";

export default class Error_500 extends Component {
    render() {
        return this.compile(error_500Tlp);
    }
}
