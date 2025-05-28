import Component from "../../services/Component";
import error_404Tlp from "./Error_404Tpl";

export default class Error_404 extends Component {
    render() {
        return this.compile(error_404Tlp);
    }
}
