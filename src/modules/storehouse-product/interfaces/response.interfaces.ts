import { GlobalResponse, PaginationResponse } from '../../../common'
import { StorehouseProductRequired } from './fields.interfaces'

export declare interface StorehouseProductFindManyData extends PaginationResponse<StorehouseProductFindOneData> {}

export declare interface StorehouseProductFindManyResponse extends GlobalResponse {
	data: StorehouseProductFindManyData
}

export declare interface StorehouseProductFindOneData extends Pick<StorehouseProductRequired, 'id' | 'createdAt'> {}

export declare interface StorehouseProductFindOneResponse extends GlobalResponse {
	data: StorehouseProductFindOneData
}

export declare interface StorehouseProductModifyResposne extends GlobalResponse {
	data: null
}
