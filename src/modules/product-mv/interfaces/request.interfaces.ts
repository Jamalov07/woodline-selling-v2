import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductMVOptional, ProductMVRequired } from './fields.interfaces'

export declare interface ProductMVFindManyRequest
	extends PaginationRequest,
		Pick<ProductMVOptional, 'productId' | 'sellingId' | 'purchaseId' | 'transferId' | 'type'>,
		Pick<RequestOtherFields, 'isDeleted' | 'search'> {}

export declare interface ProductMVFindOneRequest extends Pick<ProductMVRequired, 'id'> {}

export declare interface ProductMVGetManyRequest extends PaginationRequest, ProductMVOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface ProductMVGetOneRequest extends ProductMVOptional {}

export declare interface ProductMVCreateOneRequest extends Pick<ProductMVRequired, 'productId' | 'sellingId' | 'purchaseId' | 'transferId' | 'type'> {}

export declare interface ProductMVUpdateOneRequest extends Pick<ProductMVOptional, 'productId' | 'sellingId' | 'purchaseId' | 'transferId' | 'type' | 'deletedAt'> {}

export declare interface ProductMVDeleteOneRequest extends Pick<ProductMVOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
