import { action, computed, makeObservable, observable, runInAction } from "mobx"
import agent from "../../api/agent"
import { BaseEntity, BaseEntityFormValues } from "../../common/models/Entity"
import { BaseEntityResource } from "../../api/baseResource"
import { PaginationParams } from "../models/paginationPrams"
import { toast } from "react-toastify"
import { toastBasic } from "../configs"

export default class BaseEntityStore<
  TId,
  TEntity extends BaseEntity<TId>,
  TEntityFormValues extends BaseEntityFormValues<number>
> {
  _items: TEntity[] = []
  _selectedItem: TEntity | undefined = undefined
  resource: BaseEntityResource<TId, TEntity, TEntityFormValues>
  isListLoading: boolean = false
  isDetailsLoading: boolean = false
  isCreateLoading: boolean = false
  isUpdateLoading: boolean = false
  isDeleteLoading: boolean = false

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
    })

    this.resource = agent.createEntityResource<TId, TEntity, TEntityFormValues>(entityType)
  }

  get items(): TEntity[] {
    return this._items
  }

  setItems(items: TEntity[]): void {
    this._items = []
    this._items.push(...items)
  }

  createItem(item: TEntity): void {
    this._items.unshift(item)
  }

  updateItem(id: TId, formValues: TEntityFormValues): void {
    if (this._selectedItem)
      if (id === this._selectedItem.id)
        Object.assign(this._selectedItem, formValues)
    const index = this._items.findIndex((e) => e.id === id)
    if (index !== -1) {
      Object.assign(this._items[index], formValues)
    }
  }

  updateEntityItem(id: TId, entity: TEntity): void {
    if (this._selectedItem)
      if (id === this._selectedItem.id)
        Object.assign(this._selectedItem, entity)
    const index = this._items.findIndex((e) => e.id === id)
    if (index !== -1) {
      this._items[index] = entity
    }
  }

  deleteItem(id: TId): void {
    const itemIndex = this._items.findIndex((item) => item.id === id)
    this._items.splice(itemIndex, 1)
  }

  get selectedItem(): TEntity | undefined {
    return this._selectedItem
  }

  setSelectedItem(item: TEntity | undefined): void {
    this._selectedItem = item
  }

  setListLoading(value: boolean) {
    this.isListLoading = value
  }

  setDetailsLoading(value: boolean) {
    this.isDetailsLoading = value
  }

  setCreateLoading(value: boolean) {
    this.isCreateLoading = value
  }

  setUpdateLoading(value: boolean) {
    this.isUpdateLoading = value
  }

  setDeleteLoading(value: boolean) {
    this.isDeleteLoading = value
  }

  load = async (params?: PaginationParams): Promise<TEntity[]> => {
    try {
      this.setListLoading(true)
      const list = await this.resource.list(params)
      runInAction(() => {
        this.setItems(list)
      })
      return list
    } catch (error) {
      console.error("Request error:", error)
      return []
    } finally {
      runInAction(() => {
        this.setListLoading(false)
      })
    }
  }

  get = async (
    id: TId,
    shouldRefresh: boolean = false
  ): Promise<TEntity | undefined> => {
    try {
      this.setDetailsLoading(true)
      const cachedItem = this.items.find((x) => x.id === id)
      if (!shouldRefresh && cachedItem) {
        this.setSelectedItem(cachedItem)
        return cachedItem
      }

      const item = await this.resource.details(id)
      runInAction(() => {
        this.setSelectedItem(item)
        if (shouldRefresh && cachedItem) this.updateEntityItem(id, item)
      })

      return item
    } catch (error) {
      console.error("Request error:", error)
    } finally {
      runInAction(() => {
        this.setDetailsLoading(false)
      })
    }
  }

  create = async (
    formValues: TEntityFormValues
  ): Promise<TEntity | undefined> => {
    try {
      this.setCreateLoading(true)
      const createdItem = await this.resource.create(formValues)
      runInAction(() => {
        this.createItem(createdItem)
      })
      toast.success("Bạn đã tạo thành công!", toastBasic)
      return createdItem
    } catch (error) {
      console.error("Request error:", error)
    } finally {
      runInAction(() => {
        this.setCreateLoading(false)
      })
    }
  }

  update = async (id: TId, formValues: TEntityFormValues): Promise<void> => {
    try {
      this.setUpdateLoading(true)
      await this.resource.update(id, formValues)
      runInAction(() => {
        this.updateItem(id, formValues)
      })
      toast.success("Bạn đã cập nhật thành công!", toastBasic)
    } catch (error) {
      console.error("Request error:", error)
    } finally {
      runInAction(() => {
        this.setUpdateLoading(false)
      })
    }
  }

  delete = async (id: TId): Promise<TEntity | undefined> => {
    try {
      this.setDeleteLoading(true)
      const deletedItem = await this.resource.delete(id)
      runInAction(() => {
        this.deleteItem(id)
      })
      return deletedItem
    } catch (error) {
      console.error("Request error:", error)
    } finally {
      runInAction(() => {
        this.setDeleteLoading(false)
      })
    }
  }
}
