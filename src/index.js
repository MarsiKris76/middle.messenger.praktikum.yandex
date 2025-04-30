import './style.css'
import renderDOM from "./utils/renderDOM.js";
import Link from "./components/link/LinkIndex.js";
import Layout from "./blocks/layout/LayoutIndex.js";
import LoginPage from "./pages/LoginPage.js";
import LoginForm from "./blocks/login/LoginForm.js";
import Button from "./components/button/Button.js";
import Input from "./components/input/Input.js";

// const navLinks = new Layout('ul',
//     {
//             content: [new Link('li', {url: "./src/pages/login.html", title: "Логин"}),
//                     new Link('li', {url: "./src/pages/registration.html", title: "Регистрация"}),
//                     new Link('li', {url: "./src/pages/profile.html", title: "Профиль"}),
//                     new Link('li', {url: "./src/pages/chat_list.html", title: "Список чатов"}),
//                     new Link('li', {url: "./src/pages/500_error.html", title: "Ошибка 500"}),
//                     new Link('li', {url: "./src/pages/404_error.html", title: "Ошибка 404"})],
//             attr: {
//                     "class": "navbar",
//             }
//     });
const loginPage = new LoginPage('main', {
    attr: {
        'class':'login'
    }
});
renderDOM('#app', loginPage);