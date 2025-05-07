const phoneRegex = /^\+?\d{10,15}$/;
const emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9.-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{1,})$/;
const loginRegex = /^(?=\w*?[a-zA-Z])[\w-]{3,20}$/;
const nameRegex = /^[A-ZА-Я][a-zа-я]*(?:-[A-ZА-Я][a-zа-я]*)*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;

export const isValidEmail = (email) => {
    return emailRegex.test(email);
};

export const isValidLogin = (login) => {
    return loginRegex.test(login);
};

export const isNonEmpty = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

export const isValidName = (name) => {
    return nameRegex.test(name);
};

export const isValidPassword = (password) => {
    return passwordRegex.test(password);
};

export const isValidPhone = (phone) => {
    return phoneRegex.test(phone);
};
