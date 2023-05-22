import { action, makeObservable, observable } from "mobx";
import agent from "../../api/agent";
import { handleRequestError } from "../../api/apiUtils";
import Entity, { EntityFormValues } from "../../common/models/Entity";
import { BaseResource } from "../../api/baseResource";
import { PaginationParams } from "../models/paginationPrams";

export default class BaseStore<TEntity extends Entity, TEntityFormValues extends EntityFormValues> {
    items: TEntity[] = [];
    selectedItem: TEntity | undefined = undefined;
    resource: BaseResource<TEntity, TEntityFormValues>

    constructor(entityType: string) {
        makeObservable(this, {
            items: observable,
            selectedItem: observable,
            load: action,
            get: action,
            create: action,
            update: action,
            delete: action
        });

        this.resource = agent.createResource<TEntity, TEntityFormValues>(entityType);
    }

    load = async (params?: PaginationParams) => {
        try {
            const items = await this.resource.list(params);
            this.items = items;
        } catch (error) {
            handleRequestError(error);
        }
    };

    get = async (id: string) => {
        try {
            const item = await this.resource.details(id);
            this.selectedItem = item;
        } catch (error) {
            handleRequestError(error);
        }
    };

    create = async (item: TEntityFormValues) => {
        try {
            const createdItem = await this.resource.create(item);
            this.items.push(createdItem);
            return createdItem;
        } catch (error) {
            handleRequestError(error);
            return null;
        }
    };

    update = async (id: string, updatedItem: TEntityFormValues) => {
        try {
            await this.resource.update(id, updatedItem);
            const index = this.items.findIndex((item) => item.id === id);
            if (index !== -1) {
                this.items[index] = { ...this.items[index], ...updatedItem };
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    delete = async (id: string) => {
        try {
            const deletedItem = await this.resource.delete(id);
            this.items = this.items.filter((item) => item.id !== id);
            return deletedItem;
        } catch (error) {
            handleRequestError(error);
            return null;
        }
    };
}
