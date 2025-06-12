import { PaginationRequest, RequestOtherFields } from '../../../common'
import { StorehouseOptional, StorehouseRequired } from './fields.interfaces'

export declare interface StorehouseFindManyRequest extends PaginationRequest, Pick<StorehouseOptional, 'name' | 'type'>, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface StorehouseFindOneRequest extends Pick<StorehouseRequired, 'id'> {}

export declare interface StorehouseGetManyRequest extends PaginationRequest, StorehouseOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface StorehouseGetOneRequest extends StorehouseOptional {}

export declare interface StorehouseCreateOneRequest extends Pick<StorehouseRequired, 'name' | 'type'> {}

export declare interface StorehouseUpdateOneRequest extends Pick<StorehouseOptional, 'name' | 'deletedAt' | 'type'> {}

export declare interface StorehouseDeleteOneRequest extends Pick<StorehouseOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
