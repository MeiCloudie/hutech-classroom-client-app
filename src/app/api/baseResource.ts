import Entity, { BaseEntity, BaseEntityFormValues, EntityFormValues } from "../common/models/Entity";
import { PaginationParams } from "../common/models/paginationPrams";

export interface BaseResource<
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
> {
  list: (params?: PaginationParams) => Promise<TEntity[]>;
  details: (id: string) => Promise<TEntity>;
  create: (formValues: TEntityFormValues) => Promise<TEntity>;
  update: (id: string, formValues: TEntityFormValues) => Promise<void>;
  delete: (id: string) => Promise<TEntity>;
}

export interface BaseUserResource<
  TEntity extends Entity
> {
    listByUser: (params?: PaginationParams) => Promise<TEntity[]>;
}

export interface BaseHasManyRelationshipResource<
TManyEntity extends Entity
> {
  listEntities: (id: string, params?: PaginationParams) => Promise<TManyEntity[]>;
  addEntity: (firstEntityId: string, secondEntityId: string) => Promise<void>;
  removeEntity: (firstEntityId: string, secondEntityId: string) => Promise<void>;
  addEntities: (firstEntityId: string, secondEntityIds: string[]) => Promise<void>;
  removeEntities: (firstEntityId: string, secondEntityIds: string[]) => Promise<void>;
}

export interface BaseEntityResource<
  TId,
  TEntity extends BaseEntity<TId>,
  TEntityFormValues extends BaseEntityFormValues<number>
> {
  list: (params?: PaginationParams) => Promise<TEntity[]>;
  details: (id: TId) => Promise<TEntity>;
  create: (formValues: TEntityFormValues) => Promise<TEntity>;
  update: (id: TId, formValues: TEntityFormValues) => Promise<void>;
  delete: (id: TId) => Promise<TEntity>;
}

export interface BaseEntityUserResource<
  TId,
  TEntity extends BaseEntity<TId>
> {
    listByUser: (params?: PaginationParams) => Promise<TEntity[]>;
}

export interface BaseEntityHasManyRelationshipResource<
TFirstId,
TSecondId,
TManyEntity extends BaseEntity<TSecondId>
> {
  listEntities: (id: TFirstId, params?: PaginationParams) => Promise<TManyEntity[]>;
  addEntity: (firstEntityId: TFirstId, secondEntityId: TSecondId) => Promise<void>;
  removeEntity: (firstEntityId: TFirstId, secondEntityId: TSecondId) => Promise<void>;
  addEntities: (firstEntityId: TFirstId, secondEntityIds: TSecondId[]) => Promise<void>;
  removeEntities: (firstEntityId: TFirstId, secondEntityIds: TSecondId[]) => Promise<void>;
}

export interface BaseNonEntityHasManyRelationshipResource<
TFirstId,
TSecondId,
TResponse
> {
  listNonEntities: (id: TFirstId, params?: PaginationParams) => Promise<TResponse[]>;
  addNonEntity: (firstEntityId: TFirstId, secondEntityId: TSecondId) => Promise<void>;
  removeNonEntity: (firstEntityId: TFirstId, secondEntityId: TSecondId) => Promise<void>;
  addNonEntities: (firstEntityId: TFirstId, secondEntityIds: TSecondId[]) => Promise<void>;
  removeNonEntities: (firstEntityId: TFirstId, secondEntityIds: TSecondId[]) => Promise<void>;
}