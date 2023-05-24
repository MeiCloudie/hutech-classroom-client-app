export default interface Entity {
    id: string,
}

export interface Auditable {
    createDate: Date
}

export interface EntityFormValues {
    id?: string
}