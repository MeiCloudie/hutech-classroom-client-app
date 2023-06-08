import axios, { AxiosError, AxiosResponse } from "axios";
import { PaginationParams } from "../common/models/paginationPrams";
import {
  ChangePasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  User,
} from "../models/User";
import { store } from "../stores/store";
import Entity, { EntityFormValues } from "../common/models/Entity";
import {
  BaseHasManyRelationshipResource,
  BaseResource,
  BaseUserResource,
} from "./baseResource";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = process.env.REACT_APP_HUTECH_CLASSROOM_BASE_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// const sleep = (delay: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// };

axios.interceptors.response.use(
  async (response) => {
    // if (process.env.NODE_ENV === "development") await sleep(1000);
    // const pagination = response.headers['pagination']
    // if (pagination) {
    //     response.data = new PaginatedResult(response.data, JSON.parse(pagination))
    //     return response as AxiosResponse<PaginatedResult<any>>
    // }
    return response;
  },
  (error: AxiosError) => {
    const { status, config } = error.response as AxiosResponse;
    const data = error.response?.data as any;
    switch (status) {
      case 400:
        if (data) break;
        console.log(data)
        if (
          config.method === "get" &&
          Object.keys(data.errors).some((key) =>
            key.toLowerCase().includes("id")
          )
        ) {
          router.navigate("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
            throw modalStateErrors.flat();
          }
        } else {
          toast.error(data);
        }
        break;
      case 401:
        if (store.commonStore.appLoaded) toast.error("Xác thực thất bại");
        break;
      case 403:
        toast.error("Bạn không có quyền truy cập!");
        break;
      case 404:
        router.navigate("not-found");
        break;
      case 500:
        if (data) break;
        store.commonStore.setServerError(data);
        router.navigate("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string, params?: PaginationParams) =>
    axios
      .get<T>(url, { params: params?.toUrlSearchParams() })
      .then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
};

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

const createUserResource = <TEntity extends Entity>(entityName: string) => {
  const resource: BaseUserResource<TEntity> = {
    listByUser: (params?: PaginationParams) =>
      requests.get<TEntity[]>(`v1/Users/@me/${entityName}`, params),
  };
  return resource;
};

const createHasManyRelationshipResource = <TManyEntity extends Entity>(
  firstEntityName: String,
  secondEntityName: String
) => {
  const resource: BaseHasManyRelationshipResource<TManyEntity> = {
    listEntities: (id: String, params?: PaginationParams) =>
      requests.get<TManyEntity[]>(
        `v1/${firstEntityName}/${id}/${secondEntityName}`,
        params
      ),
    addEntity: (firstEntityId: string, secondEntityId: string) =>
      requests.post(
        `v1/${firstEntityName}/${firstEntityId}/${secondEntityName}/${secondEntityId}`,
        {}
      ),
    removeEntity: (firstEntityId: string, secondEntityId: string) =>
      requests.delete(
        `v1/${firstEntityName}/${firstEntityId}/${secondEntityName}/${secondEntityId}`
      ),
  };
  return resource;
};

const Account = {
  login: (credentials: LoginFormValues) =>
    requests.post<User>("v1/Account/login", credentials),
  register: (credentials: RegisterFormValues) =>
    requests.post<User>("v1/Account/register", credentials),
  current: () => requests.get<User>("v1/Users/@me"),
  changePassword: (credentials: ChangePasswordFormValues) =>
    requests.patch("v1/Account/change-password", credentials),
};

const Results = {
  notFound: () => requests.get("v1/Results/not-found"),
  ok: () => requests.get("v1/Results/ok"),
  badRequest: () => requests.get("v1/Results/bad-request"),
  noContent: () => requests.get("v1/Results/no-content"),
  unauthorized: () => requests.get("v1/Results/unauthorized"),
  conflict: () => requests.get("v1/Results/conflict"),
  forbid: () => requests.get("v1/Results/forbid"),
  internalServerError: () => requests.get("v1/Results/internal-server-error"),
};

const agent = {
  Account,
  Results,
  createResource,
  createUserResource,
  createHasManyRelationshipResource,
};

export default agent;
