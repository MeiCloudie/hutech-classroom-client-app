import { action, makeObservable } from "mobx";
import agent from "../../api/agent";
import { BaseUserResource } from "../../api/baseResource";
import Entity, { EntityFormValues } from "../models/Entity";
import EntityStore from "./entityStore";
import { PaginationParams } from "../models/paginationPrams";

export default class UserRelatedStore<TEntity extends Entity, TEntityFormValues extends EntityFormValues> extends EntityStore<TEntity, TEntityFormValues> {
    userResource: BaseUserResource<TEntity>

    constructor(entityType: string) {
        super(entityType)

        this.userResource = agent.createUserResource<TEntity>(entityType);

        makeObservable(this, {
            loadUserRelatedItems: action
        })
    }

    loadUserRelatedItems = async (params?: PaginationParams): Promise<void> => {
        try {
            const items = await this.userResource.listByUser(params);
            this.setItems(items);
        } catch (error) {
            console.error("Request error:", error);
        }
    };
}