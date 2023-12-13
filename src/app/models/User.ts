import { Faculty } from "./Faculty";

export interface User {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
    avatarUrl?: string,
    class: string,
    email: string,
    faculty?: Faculty,
    roles: string[],
    token?: string
}

export interface LoginFormValues {
    userName: string,
    password: string
}

export interface RegisterFormValues {
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    facultyId?: string
}

export interface ChangePasswordFormValues {
    password: string,
    newPassword: string
}

export interface ChangeEmailFormValues {
    newEmail: string
}