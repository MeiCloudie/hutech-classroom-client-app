import axios, { AxiosResponse } from "axios";
import { Classroom, ClassroomFormValues } from "../models/Classroom";
import { Subject, SubjectFormValues } from "../models/Subject";
import { PaginationParams } from "../common/models/paginationPrams";
import { ChangePasswordFormValues, LoginFormValues, RegisterFormValues, User } from "../models/User";
import { store } from "../stores/store";
import Entity, { EntityFormValues } from "../common/models/Entity";
import { Faculty } from "../models/Faculty";
import { BaseResource, BaseUserResource } from "./baseResource";


axios.defaults.baseURL = "https://hutechclassroom.azurewebsites.net/api/";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string, params?: PaginationParams) => axios.get<T>(url, { params: params?.toUrlSearchParams() }).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch(url, body).then(responseBody)
}

const createResource = <
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
>(
    entityName: string
): BaseResource<TEntity, TEntityFormValues> => {
  const resource: BaseResource<TEntity, TEntityFormValues> = {
    list: (params?: PaginationParams) =>
      requests.get<TEntity[]>(`v1/${entityName}`, params),
    details: (id: string) => requests.get<TEntity>(`v1/${entityName}/${id}`),
    create: (formValues: TEntityFormValues) =>
      requests.post<TEntity>(`v1/${entityName}`, formValues),
    update: (id: string, formValues: TEntityFormValues) =>
      requests.put(`v1/${entityName}/${id}`, formValues),
    delete: (id: string) => requests.delete(`v1/${entityName}/${id}`),
  };
  return resource;
};


const createUserResource = <
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
>(
  entityName: string
): BaseUserResource<TEntity, TEntityFormValues> => {
  const resource: BaseUserResource<TEntity, TEntityFormValues> = {
    ...createResource<TEntity, TEntityFormValues>(entityName),
    listByUser: (params?: PaginationParams) => requests.get<TEntity[]>(`v1/@me/${entityName}`, params)
  };
  return resource;
};


const Classrooms : BaseUserResource<Classroom, ClassroomFormValues> = {
    list: (params?: PaginationParams) => requests.get<Classroom[]>("v1/Classrooms", params),
    listByUser: (params?: PaginationParams) => requests.get<Classroom[]>("v1/Users/@me/Classrooms", params),
    details: (id: string) => requests.get<Classroom>(`v1/Classrooms/${id}`),
    create: (classroomFormValues: ClassroomFormValues) => requests.post<Classroom>('v1/Classrooms', classroomFormValues),
    update: (id: string, classroomFormValues: ClassroomFormValues) => requests.put(`v1/Classrooms/${id}`, classroomFormValues),
    delete: (id: string) => requests.delete(`v1/Classrooms/${id}`)
}

const Subjects = {
    list: (params?: PaginationParams) => requests.get<Subject[]>("v1/Subjects", params),
    details: (id: string) => requests.get<Subject>(`v1/Subjects/${id}`),
    create: (SubjectFormValues: SubjectFormValues) => requests.post<Subject>('v1/Subjects', SubjectFormValues),
    update: (id: string, SubjectFormValues: SubjectFormValues) => requests.put(`v1/Subjects/${id}`, SubjectFormValues),
    delete: (id: string) => requests.delete(`v1/Subjects/${id}`)
}

const Account = {
    login: (creds: LoginFormValues) => requests.post<User>("v1/Account/login", creds),
    register: (creds: RegisterFormValues) => requests.post<User>("v1/Account/register", creds),
    current: () => requests.get<User>("v1/Users/@me"),
    changePassword: (creds: ChangePasswordFormValues) => requests.patch("v1/Account/change-password", creds)
}

const Results = {
    notFound: () => requests.get("v1/Results/not-found"),
    ok: () => requests.get("v1/Results/ok"),
    badRequest: () => requests.get("v1/Results/bad-request"),
    noContent: () => requests.get("v1/Results/no-content"),
    unauthorized: () => requests.get("v1/Results/unauthorized"),
    conflict: () => requests.get("v1/Results/conflict"),
    forbid: () => requests.get("v1/Results/forbid"),
    internalServerError: () => requests.get("v1/Results/internal-server-error"),
}

const agent = {
    Account,
    Classrooms,
    Subjects,
    Results
};

export default agent;