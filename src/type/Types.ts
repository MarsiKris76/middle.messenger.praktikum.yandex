import Component, {ComponentProps} from "../services/Component";

export type SimpleResponse = {
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
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    avatar: string,
    email: string
};

export type SearchUsersRequest = {
    login: string
};

export type ChangeUserRequest = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export type ChangePasswordRequest = {
    oldPassword: string,
    newPassword: string
}

export type CreateChatRequest = {
    title: string
}

export type CreateChatResponse = {
    title: number
}

export type GetChatRequest = {
    offset?: number,
    limit?: number,
    title?: string
}

export type GetChatResponse = {
    id: number,
    title: string,
    avatar: string,
    unread_count: number,
    created_by: number,
    last_message: {
        user: {
            first_name: string,
            second_name: string,
            avatar: string,
            email: string,
            login: string,
            phone: string
        },
        time: string,
        content: string
    }
}

export type DeleteChatRequest = {
    chatId: string,
}

export type DeleteChatResponse = {
    userId: number,
    result: {
        id: number,
        title: string,
        avatar: string,
        created_by: number
    }
}

export type UsersRequest = {
    users: string[],
    chatId: string
}

export type ChatUsersResponse = {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    avatar: string,
    role: string
}

export type ChatTokenResponse = {
    token: string
}

export type MassageFromSocket = {
    id?: string,
    time?: string,
    user_id?: string,
    content?: string,
    type?: string
}

export type MessageFormType = {
    message: string,
}

export type BlockClass = new (tagName: string, props: ComponentProps) => Component;
