import { GlobalResponse, PaginationResponse } from '../../../common'
import { SPSRequired } from './fields.interfaces'

export declare interface SPSFindManyData extends PaginationResponse<SPSFindOneData> {}

export declare interface SPSFindManyResponse extends GlobalResponse {
	data: SPSFindManyData
}

export declare interface SPSFindOneData extends Pick<SPSRequired, 'id' | 'createdAt'> {}

export declare interface SPSFindOneResponse extends GlobalResponse {
	data: SPSFindOneData
}

export declare interface SPSModifyResposne extends GlobalResponse {
	data: null
}
