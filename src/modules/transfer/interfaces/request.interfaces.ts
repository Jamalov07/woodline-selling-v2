import { PaginationRequest, RequestOtherFields } from '../../../common'
import { TransferOptional, TransferRequired } from './fields.interfaces'

export declare interface TransferFindManyRequest
	extends PaginationRequest,
		Pick<TransferOptional, 'fromStorehouseId' | 'toStorehouseId' | 'status' | 'toStorekeeperId' | 'fromStorekeeperId'>,
		Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface TransferFindOneRequest extends Pick<TransferRequired, 'id'> {}

export declare interface TransferGetManyRequest extends PaginationRequest, TransferOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface TransferGetOneRequest extends TransferOptional {}

export declare interface TransferCreateOneRequest extends Pick<TransferRequired, 'fromStorehouseId' | 'toStorehouseId' | 'toStorekeeperId' | 'fromStorekeeperId'> {}

export declare interface TransferUpdateOneRequest
	extends Pick<TransferOptional, 'fromStorehouseId' | 'toStorehouseId' | 'toStorekeeperId' | 'fromStorekeeperId' | 'status' | 'deletedAt'> {}

export declare interface TransferDeleteOneRequest extends Pick<TransferOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
