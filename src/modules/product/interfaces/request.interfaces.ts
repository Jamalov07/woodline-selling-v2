import { SPStatus } from '@prisma/client'
import { PaginationRequest, RequestOtherFields } from '../../../common'
import { ProductOptional, ProductRequired } from './fields.interfaces'

export declare interface ProductFindManyRequest
	extends PaginationRequest,
		Pick<ProductOptional, 'description' | 'direction' | 'modelId' | 'publicId' | 'tissue'>,
		Pick<RequestOtherFields, 'isDeleted' | 'search'> {
	statuses?: SPStatus[]
	isBooked?: boolean
}

export declare interface ProductFindOneRequest extends Pick<ProductRequired, 'id'> {}

export declare interface ProductGetManyRequest extends PaginationRequest, ProductOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface ProductGetOneRequest extends ProductOptional {}

export declare interface ProductCreateOneRequest
	extends Pick<ProductOptional, 'type'>,
		Pick<ProductRequired, 'description' | 'direction' | 'modelId' | 'publicId' | 'tissue' | 'quantity'> {}

export declare interface ProductUpdateOneRequest extends Pick<ProductOptional, 'description' | 'direction' | 'modelId' | 'tissue' | 'quantity' | 'deletedAt'> {}

export declare interface ProductDeleteOneRequest extends Pick<ProductOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
