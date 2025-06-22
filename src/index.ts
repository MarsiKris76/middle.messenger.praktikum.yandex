import './style.css'
import Router from "./services/Router";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import MessengerPage from "./pages/messenger/MessengerPage";
import Error_404 from "./pages/error_404/Error_404";
import Error_500 from "./pages/error_500/Error_500";
import ChatCreaturePage from "./pages/chat_creature/ChatCreaturePage";
import ChatAddUsersPage from "./pages/chat_add_users/ChatAddUsersPage";
import {getUserInfo} from "./utils/Utils";

enum ROUTES {
    SIGN_IN = '/',
    SIGN_UP = '/sign-up',
    MESSENGER = '/messenger',
    SETTINGS = '/settings',
    ERROR_404 = '/404',
    ERROR_500 = '/500',
    NEW_CHAT = '/new-chat',
    LIST_CHAT = '/list-chat-user/:id'

}

getUserInfo(false).finally(() => {
    Router
        .use(ROUTES.SIGN_IN, 'Вход', LoginPage, 'main', {
            attr: {
            'class':'login'
            }
        })
        .use(ROUTES.SETTINGS, 'Профиль', ProfilePage, 'main', {
            attr: {
                'class':'profile'
            }
        })
        .use(ROUTES.MESSENGER, 'Чаты', MessengerPage, 'main',{
            attr: {
                'class':'messenger'
            }
        })
        .use(ROUTES.SIGN_UP, 'Регистрация', RegistrationPage, 'main',{
            attr: {
                'class':'registration'
            }
        })
        .use(ROUTES.ERROR_404, 'Страница не найдена', Error_404, 'main',{
            attr: {
                'class':'error404'
            }
        })
        .use(ROUTES.ERROR_500, 'Ошибка', Error_500, 'main',{
            attr: {
                'class':'error500'
            }
        })
        .use(ROUTES.NEW_CHAT, 'Создание нового чата', ChatCreaturePage, 'main',{
            attr: {
                'class':'creature-chat'
            }
        })
        .use(ROUTES.LIST_CHAT, 'Добавление друга в чат', ChatAddUsersPage, 'main',{
            attr: {
                'class':'search'
            }
        })
        .start();
});
