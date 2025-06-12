import { GlobalResponse, PaginationResponse } from '../../../common'
import { ProductStatusMVRequired } from './fields.interfaces'

export declare interface ProductStatusMVFindManyData extends PaginationResponse<ProductStatusMVFindOneData> {}

export declare interface ProductStatusMVFindManyResponse extends GlobalResponse {
	data: ProductStatusMVFindManyData
}

export declare interface ProductStatusMVFindOneData extends Pick<ProductStatusMVRequired, 'id' | 'createdAt'> {}

export declare interface ProductStatusMVFindOneResponse extends GlobalResponse {
	data: ProductStatusMVFindOneData
}

export declare interface ProductStatusMVModifyResposne extends GlobalResponse {
	data: null
}
