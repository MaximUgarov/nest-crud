export interface IGetTagMeta {
    page: number,
    pageSize: number
}

export interface IGetTagSort {
    byOrder: boolean | undefined
    byName: boolean | undefined
}

export interface IGetTag {
    meta: IGetTagMeta
    sort: IGetTagSort
}