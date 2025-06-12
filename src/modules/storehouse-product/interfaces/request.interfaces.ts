import { SPStatus } from '@prisma/client'
import { PaginationRequest, RequestOtherFields } from '../../../common'
import { StorehouseProductOptional, StorehouseProductRequired } from './fields.interfaces'

export declare interface StorehouseProductFindManyRequest
	extends PaginationRequest,
		Pick<StorehouseProductOptional, 'productId' | 'storehouseId'>,
		Pick<RequestOtherFields, 'isDeleted' | 'search'> {
	statuses?: SPStatus[]
	isBooked?: boolean
	bookedByMe?: boolean
	bookedStorekeeperId?: string
}

export declare interface StorehouseProductFindOneRequest extends Pick<StorehouseProductRequired, 'id'> {}

export declare interface StorehouseProductGetManyRequest extends PaginationRequest, StorehouseProductOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface StorehouseProductGetOneRequest extends StorehouseProductOptional {}

export declare interface StorehouseProductCreateOneRequest extends Pick<StorehouseProductRequired, 'productId' | 'storehouseId'> {}

export declare interface StorehouseProductUpdateOneRequest extends Pick<StorehouseProductOptional, 'productId' | 'storehouseId' | 'deletedAt'> {}

export declare interface StorehouseProductDeleteOneRequest extends Pick<StorehouseProductOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
