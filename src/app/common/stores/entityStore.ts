import { action, computed, makeObservable, observable } from "mobx";
import agent from "../../api/agent";
import Entity, { EntityFormValues } from "../../common/models/Entity";
import { BaseResource } from "../../api/baseResource";
import { PaginationParams } from "../models/paginationPrams";

export default class EntityStore<
  TEntity extends Entity,
  TEntityFormValues extends EntityFormValues
> {
  _items: TEntity[] = [];
  _selectedItem: TEntity | undefined = undefined;
  resource: BaseResource<TEntity, TEntityFormValues>;
  isListLoading: boolean = false;
  isDetailsLoading: boolean = false;
  isCreateLoading: boolean = false;
  isUpdateLoading: boolean = false;
  isDeleteLoading: boolean = false;

  constructor(entityType: string) {
    makeObservable(this, {
      _items: observable,
      _selectedItem: observable,
      isListLoading: observable,
      isDetailsLoading: observable,
      isCreateLoading: observable,
      isUpdateLoading: observable,
      isDeleteLoading: observable,
      items: computed,
      selectedItem: computed,
      setItems: action,
      createItem: action,
      updateItem: action,
      deleteItem: action,
      setSelectedItem: action,
      load: action,
      get: action,
      create: action,
      update: action,
      delete: action,
      setListLoading: action,
      setDetailsLoading: action,
      setCreateLoading: action,
      setUpdateLoading: action,
      setDeleteLoading: action,
    });

    this.resource = agent.createResource<TEntity, TEntityFormValues>(
      entityType
    );
  }

  get items(): TEntity[] {
    return this._items;
  }

  setItems(items: TEntity[]): void {
    this._items = [];
    this._items.push(...items);
  }

  createItem(item: TEntity): void {
    this._items.push(item);
  }

  updateItem(id: string, formValues: TEntityFormValues): void {
    const index = this._items.findIndex((e) => e.id === id);
    if (index !== -1) {
      this._items[index] = { ...this._items[index], ...formValues };
    }
  }

  deleteItem(id: string): void {
    const itemIndex = this._items.findIndex((item) => item.id === id);
    this._items.splice(itemIndex);
  }

  get selectedItem(): TEntity | undefined {
    return this._selectedItem;
  }

  setSelectedItem(item: TEntity | undefined): void {
    this._selectedItem = item;
  }

  setListLoading(value: boolean) {
    this.isListLoading = value;
  }

  setDetailsLoading(value: boolean) {
    this.isDetailsLoading = value;
  }

  setCreateLoading(value: boolean) {
    this.isCreateLoading = value;
  }

  setUpdateLoading(value: boolean) {
    this.isUpdateLoading = value;
  }

  setDeleteLoading(value: boolean) {
    this.isDeleteLoading = value;
  }

  load = async (params?: PaginationParams): Promise<TEntity[]> => {
    try {
      this.setListLoading(true);
      const list = await this.resource.list(params);
      this.setItems(list);
      return list;
    } catch (error) {
      console.error("Request error:", error);
      return [];
    } finally {
      this.setListLoading(false);
    }
  };

  get = async (id: string): Promise<TEntity | undefined> => {
    try {
      this.setDetailsLoading(true);
      const item = await this.resource.details(id);
      this.setSelectedItem(item);
      return item;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setDetailsLoading(false);
    }
  };

  create = async (
    formValues: TEntityFormValues
  ): Promise<TEntity | undefined> => {
    try {
      this.setCreateLoading(true);
      const createdItem = await this.resource.create(formValues);
      this.createItem(createdItem);
      return createdItem;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setCreateLoading(false);
    }
  };

  update = async (id: string, formValues: TEntityFormValues): Promise<void> => {
    try {
      this.setUpdateLoading(true);
      await this.resource.update(id, formValues);
      this.updateItem(id, formValues);
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setUpdateLoading(false);
    }
  };

  delete = async (id: string): Promise<TEntity | undefined> => {
    try {
      this.setDeleteLoading(true);
      const deletedItem = await this.resource.delete(id);
      this.deleteItem(id);
      return deletedItem;
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      this.setDeleteLoading(false);
    }
  };
}
