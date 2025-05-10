const phoneRegex = /^\+?\d{10,15}$/;
const emailRegex = /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9.-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]+)$/;
const loginRegex = /^(?=\w*?[a-zA-Z])[\w-]{3,20}$/;
const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-ZА-ЯЁ][a-zа-яё]*)*$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;

const isValidEmail = (email: string) => {
    return emailRegex.test(email);
};
const isValidLogin = (login: string) => {
    return loginRegex.test(login);
};
const isNonEmpty = (str: string) => {
    return str.trim().length > 0;
};
const isValidName = (name: string) => {
    return nameRegex.test(name);
};
const isValidPassword = (password: string) => {
    return passwordRegex.test(password);
};
const isValidPhone = (phone: string) => {
    return phoneRegex.test(phone);
};

export function loginValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isValidLogin(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}

export function passwordValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isValidPassword(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}

export function emptyValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isNonEmpty(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}

export function emailValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isValidEmail(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}

export function nameValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isValidName(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}

export function phoneValidation(event: Event) {
    const input = event.target;
    if (input instanceof HTMLInputElement) {
        if (isValidPhone(input.value)) {
            input.classList.remove("input_base--error");
            return;
        }
        input.classList.add("input_base--error");
    }
}
