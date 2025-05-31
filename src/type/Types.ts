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