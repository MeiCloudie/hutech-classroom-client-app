export interface BaseEntity<TId> {
    id: TId
}

export default interface Entity extends BaseEntity<string> {
}

export interface Auditable {
    createDate: Date
}

export interface BaseEntityFormValues<TId> {
    id?: TId
}

export interface EntityFormValues {
    id?: string
}