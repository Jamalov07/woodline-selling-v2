import { PaginationRequest, RequestOtherFields } from '../../../common'
import { SPSOptional, SPSRequired } from './fields.interfaces'

export declare interface SPSFindManyRequest extends PaginationRequest, Pick<SPSOptional, 'spId' | 'status'>, Pick<RequestOtherFields, 'isDeleted' | 'search'> {}

export declare interface SPSFindOneRequest extends Pick<SPSRequired, 'id'> {}

export declare interface SPSGetManyRequest extends PaginationRequest, SPSOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface SPSGetOneRequest extends SPSOptional {}

export declare interface SPSCreateOneRequest extends Pick<SPSRequired, 'spId' | 'status' | 'quantity'> {}

export declare interface SPSUpdateOneRequest extends Pick<SPSOptional, 'spId' | 'status' | 'quantity' | 'deletedAt'> {}

export declare interface SPSDeleteOneRequest extends Pick<SPSOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
