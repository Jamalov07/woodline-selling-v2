import { GlobalResponse, PaginationResponse } from '../../../common'
import { PurchaseRequired } from './fields.interfaces'

export declare interface PurchaseFindManyData extends PaginationResponse<PurchaseFindOneData> {}

export declare interface PurchaseFindManyResponse extends GlobalResponse {
	data: PurchaseFindManyData
}

export declare interface PurchaseFindOneData extends Pick<PurchaseRequired, 'id' | 'status' | 'createdAt'> {}

export declare interface PurchaseFindOneResponse extends GlobalResponse {
	data: PurchaseFindOneData
}

export declare interface PurchaseModifyResposne extends GlobalResponse {
	data: null
}
