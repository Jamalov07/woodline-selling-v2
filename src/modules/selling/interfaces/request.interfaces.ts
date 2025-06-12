import { PaginationRequest, RequestOtherFields } from '../../../common'
import { SellingOptional, SellingRequired } from './fields.interfaces'

export declare interface SellingFindManyRequest
	extends PaginationRequest,
		Pick<SellingOptional, 'orderId' | 'storehouseId' | 'status' | 'storekeeperId'>,
		Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface SellingFindOneRequest extends Pick<SellingRequired, 'id'> {}

export declare interface SellingGetManyRequest extends PaginationRequest, SellingOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface SellingGetOneRequest extends SellingOptional {}

export declare interface SellingCreateOneRequest extends Pick<SellingRequired, 'orderId' | 'storehouseId' | 'storekeeperId'> {}

export declare interface SellingUpdateOneRequest extends Pick<SellingOptional, 'orderId' | 'storehouseId' | 'storekeeperId' | 'status' | 'deletedAt'> {}

export declare interface SellingDeleteOneRequest extends Pick<SellingOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
