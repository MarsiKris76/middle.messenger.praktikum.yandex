import './style.css'
import renderDOM from "./utils/renderDOM.js";
import LoginPage from "./pages/login/LoginPage.js";
import RegistrationPage from "./pages/registration/RegistrationPage.js";
import ProfilePage from "./pages/profile/ProfilePage.js";
import MessengerPage from "./pages/messenger/MessengerPage.js";

const loginPage = new LoginPage('main', {
    attr: {
        'class':'login'
    }
});
const registrationPage = new RegistrationPage('main',{
    attr: {
        'class':'registration'
    }
});
const profilePage = new ProfilePage('main',{
    attr: {
        'class':'profile'
    }
});
const messengerPage = new MessengerPage('main',{
    attr: {
        'class':'messenger'
    }
});
renderDOM('#app', loginPage);
document.querySelector('body').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
});
