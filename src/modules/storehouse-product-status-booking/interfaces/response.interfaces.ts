import { GlobalResponse, PaginationResponse } from '../../../common'
import { SPSBookingRequired } from './fields.interfaces'

export declare interface SPSBookingFindManyData extends PaginationResponse<SPSBookingFindOneData> {}

export declare interface SPSBookingFindManyResponse extends GlobalResponse {
	data: SPSBookingFindManyData
}

export declare interface SPSBookingFindOneData extends Pick<SPSBookingRequired, 'id' | 'createdAt'> {}

export declare interface SPSBookingFindOneResponse extends GlobalResponse {
	data: SPSBookingFindOneData
}

export declare interface SPSBookingModifyResposne extends GlobalResponse {
	data: null
}
