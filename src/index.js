import './style.css'
import renderDOM from "./utils/renderDOM.js";
import LoginPage from "./pages/login/LoginPage.js";
import RegistrationPage from "./pages/registration/RegistrationPage.js";
import ProfilePage from "./pages/profile/ProfilePage.js";

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
renderDOM('#app', loginPage);