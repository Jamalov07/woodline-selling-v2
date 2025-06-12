import { GlobalResponse, PaginationResponse } from '../../../common'
import { SellingRequired } from './fields.interfaces'

export declare interface SellingFindManyData extends PaginationResponse<SellingFindOneData> {}

export declare interface SellingFindManyResponse extends GlobalResponse {
	data: SellingFindManyData
}

export declare interface SellingFindOneData extends Pick<SellingRequired, 'id' | 'status' | 'createdAt'> {}

export declare interface SellingFindOneResponse extends GlobalResponse {
	data: SellingFindOneData
}

export declare interface SellingModifyResposne extends GlobalResponse {
	data: null
}
