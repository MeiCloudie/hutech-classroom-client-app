import { Faculty } from "./Faculty";
import { Role } from "./Role";

export interface User {
    id: string,
    userName: string,
    firstName: string,
    lastName: string,
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