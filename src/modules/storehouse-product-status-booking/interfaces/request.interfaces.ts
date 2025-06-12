import { PaginationRequest, RequestOtherFields } from '../../../common'
import { SPSBookingOptional, SPSBookingRequired } from './fields.interfaces'

export declare interface SPSBookingFindManyRequest extends PaginationRequest, Pick<SPSBookingOptional, 'spsId' | 'sellerId'>, Pick<RequestOtherFields, 'isDeleted' | 'search'> {}

export declare interface SPSBookingFindOneRequest extends Pick<SPSBookingRequired, 'id'> {}

export declare interface SPSBookingGetManyRequest extends PaginationRequest, SPSBookingOptional, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface SPSBookingGetOneRequest extends SPSBookingOptional {}

export declare interface SPSBookingCreateOneRequest extends Pick<SPSBookingRequired, 'spsId' | 'quantity'>, Pick<SPSBookingOptional, 'sellerId'> {}

export declare interface SPSBookingUpdateOneRequest extends Pick<SPSBookingOptional, 'spsId' | 'sellerId' | 'quantity' | 'deletedAt'> {}

export declare interface SPSBookingDeleteOneRequest extends Pick<SPSBookingOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
