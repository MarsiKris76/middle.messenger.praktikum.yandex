import './style.css'
import Router from "./services/Router";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MessengerPage from "./pages/messenger/MessengerPage";
import Error_404 from "./pages/error_404/Error_404";
import Error_500 from "./pages/error_500/Error_500";
import ChatCreaturePage from "./pages/chat_creature/ChatCreaturePage";
import SearchUserPage from "./pages/search/SearchUserPage";

Router
    .use('/', 'Вход', LoginPage, 'main', {
        attr: {
            'class':'login'
        }
    })
    .use('/settings', 'Профиль', ProfilePage, 'main', {
        attr: {
            'class':'profile'
        }
    })
    .use('/messenger', 'Чаты', MessengerPage, 'main',{
        attr: {
            'class':'messenger'
        }
    })
    .use('/sign-up', 'Регистрация', RegistrationPage, 'main',{
        attr: {
            'class':'registration'
        }
    })
    .use('/404', 'Страница не найдена', Error_404, 'main',{
        attr: {
            'class':'error404'
        }
    })
    .use('/500', 'Ошибка', Error_500, 'main',{
        attr: {
            'class':'error500'
        }
    })
    .use('/new-chat', 'Создание нового чата', ChatCreaturePage, 'main',{
        attr: {
            'class':'creature-chat'
        }
    })
    .use('/list-chat-user', 'Добавление друга в чат', SearchUserPage, 'main',{
        attr: {
            'class':'creature-chat'
        }
    })
    .start();
