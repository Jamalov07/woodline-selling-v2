import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductCreateOneRequest } from '../../product'
import { OrderProductOptional, OrderProductRequired } from './fields.interfaces'

export declare interface OrderProductFindManyRequest extends PaginationRequest, Pick<OrderProductOptional, 'spsId' | 'sellerId'>, Pick<RequestOtherFields, 'isDeleted'> {
	providerId?: string
}

export declare interface OrderProductFindOneRequest extends Pick<OrderProductRequired, 'id'> {}

export declare interface OrderProductGetManyRequest extends PaginationRequest, OrderProductOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface OrderProductGetOneRequest extends OrderProductOptional {}

export declare interface OrderProductCreateOneRequest
	extends Pick<OrderProductRequired, 'quantity' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum' | 'orderId'>,
		Pick<OrderProductOptional, 'sellerId' | 'type' | 'spsId'> {
	productDetail?: ProductCreateOneRequest
}

export declare interface OrderProductUpdateOneRequest
	extends Pick<OrderProductOptional, 'quantity' | 'spsId' | 'deletedAt' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum' | 'orderId' | 'status'> {
	productDetail?: ProductCreateOneRequest
}

export declare interface OrderProductDeleteOneRequest extends Pick<OrderProductOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
