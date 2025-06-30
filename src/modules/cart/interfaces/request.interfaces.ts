import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductCreateOneRequest } from '../../product'
import { CartOptional, CartRequired } from './fields.interfaces'

export declare interface CartFindManyRequest extends PaginationRequest, Pick<CartOptional, 'spsId' | 'sellerId'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface CartFindOneRequest extends Pick<CartRequired, 'id'> {}

export declare interface CartGetManyRequest extends PaginationRequest, CartOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface CartGetOneRequest extends CartOptional {}

export declare interface CartCreateOneRequest
	extends Pick<CartRequired, 'price' | 'priceWithSale' | 'sale' | 'totalSum'>,
		Pick<CartOptional, 'description' | 'quantity' | 'sellerId' | 'type' | 'spsId'> {
	productDetail?: Omit<ProductCreateOneRequest, 'description'>
}

export declare interface CartUpdateOneRequest extends Pick<CartOptional, 'quantity' | 'spsId' | 'deletedAt' | 'description' | 'price' | 'priceWithSale' | 'sale' | 'totalSum'> {
	productDetail?: Omit<ProductCreateOneRequest, 'description' | 'publicId'>
}

export declare interface CartDeleteOneRequest extends Pick<CartOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
