import axios, { AxiosResponse } from "axios";
import { PaginationParams } from "../common/models/paginationPrams";
import { ChangePasswordFormValues, LoginFormValues, RegisterFormValues, User } from "../models/User";
import { store } from "../stores/store";
import Entity, { EntityFormValues } from "../common/models/Entity";
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
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody)
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
    delete: (id: string) => requests.delete<TEntity>(`v1/${entityName}/${id}`),
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
    listByUser: (params?: PaginationParams) => requests.get<TEntity[]>(`v1/Users/@me/${entityName}`, params)
  };
  return resource;
};

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
    Results,
    createResource,
    createUserResource
};

export default agent;