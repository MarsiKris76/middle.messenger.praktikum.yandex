export type LoginResponse = {
    response?: string;
};

export type LoginRequest = {
    login: string,
    password: string,
};

export type SignUpRequest = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

export type SignUpResponse = {
    id?: number;
    response?: string;
};

export type UserResponse = {
    id: number,
    "first_name": string,
    "second_name": string,
    "display_name": string,
    "phone": string,
    "login": string,
    "avatar": string,
    "email": string
};