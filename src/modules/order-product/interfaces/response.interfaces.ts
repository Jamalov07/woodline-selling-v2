import { GlobalResponse, PaginationResponse } from '../../../common'
import { OrderProductRequired } from './fields.interfaces'

export declare interface OrderProductFindManyData extends PaginationResponse<OrderProductFindOneData> {}

export declare interface OrderProductFindManyResponse extends GlobalResponse {
	data: OrderProductFindManyData
}

export declare interface OrderProductFindOneData
	extends Pick<OrderProductRequired, 'id' | 'createdAt' | 'description' | 'price' | 'priceWithSale' | 'quantity' | 'sale' | 'status' | 'totalSum' | 'type'> {}

export declare interface OrderProductFindOneResponse extends GlobalResponse {
	data: OrderProductFindOneData
}

export declare interface OrderProductModifyResposne extends GlobalResponse {
	data: null
}
