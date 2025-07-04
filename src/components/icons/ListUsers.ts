import Component from "../../services/Component";

export default class ListUsersIcon extends Component {
    render() {
        return this.compile('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11 9c0 1.66-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3m3 11H2v-2c0-2.21 2.69-4 6-4s6 1.79 6 4M7 9c0 .55.45 1 1 1s1-.45 1-1s-.45-1-1-1s-1 .45-1 1m-3 9h8c0-1.1-1.79-2-4-2s-4 .9-4 2m18-6v2h-9v-2m9-4v2h-9V8m9-4v2h-9V4Z"/></svg>');
    }
}
