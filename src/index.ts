import './style.css'
import renderDOM from "./utils/renderDOM";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MessengerPage from "./pages/messenger/MessengerPage";

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
const nav = document.getElementById('navbar')
nav?.addEventListener('click', e => {
    const target = e.target;
    nav.style.display = "none";
    if (target instanceof HTMLElement && 'text' in target) {
        console.log(target.text)
        switch (target.text) {
            case 'Вход':
                renderDOM('#app', loginPage);
                break;
            case 'Регистрация':
                renderDOM('#app', registrationPage);
                break;
            case 'Профиль':
                renderDOM('#app', profilePage);
                break;
            case 'Мессенджер':
                renderDOM('#app', messengerPage);
                break;


        }
    }

})

document.querySelector('body')?.addEventListener('submit', function (event: SubmitEvent) {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) {
        return;
    }
    const form = event.target;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        const blurEvent = new Event('blur');
        input.dispatchEvent(blurEvent);
    });
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
});
