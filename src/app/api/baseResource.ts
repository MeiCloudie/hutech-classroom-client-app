import Entity, { EntityFormValues } from "../common/models/Entity";
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
}
