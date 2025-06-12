import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductStatusMVOptional, ProductStatusMVRequired } from './fields.interfaces'

export declare interface ProductStatusMVFindManyRequest
	extends PaginationRequest,
		Pick<ProductStatusMVOptional, 'productMVId' | 'status'>,
		Pick<RequestOtherFields, 'isDeleted' | 'search'> {}

export declare interface ProductStatusMVFindOneRequest extends Pick<ProductStatusMVRequired, 'id'> {}

export declare interface ProductStatusMVGetManyRequest extends PaginationRequest, ProductStatusMVOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface ProductStatusMVGetOneRequest extends ProductStatusMVOptional {}

export declare interface ProductStatusMVCreateOneRequest extends Pick<ProductStatusMVRequired, 'productMVId' | 'status' | 'quantity'> {}

export declare interface ProductStatusMVUpdateOneRequest extends Pick<ProductStatusMVOptional, 'productMVId' | 'status' | 'quantity' | 'isAccepted' | 'deletedAt'> {}

export declare interface ProductStatusMVDeleteOneRequest extends Pick<ProductStatusMVOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
