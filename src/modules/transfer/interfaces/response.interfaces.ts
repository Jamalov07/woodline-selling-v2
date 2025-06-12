import { GlobalResponse, PaginationResponse } from '../../../common'
import { TransferRequired } from './fields.interfaces'

export declare interface TransferFindManyData extends PaginationResponse<TransferFindOneData> {}

export declare interface TransferFindManyResponse extends GlobalResponse {
	data: TransferFindManyData
}

export declare interface TransferFindOneData extends Pick<TransferRequired, 'id' | 'status' | 'createdAt'> {}

export declare interface TransferFindOneResponse extends GlobalResponse {
	data: TransferFindOneData
}

export declare interface TransferModifyResposne extends GlobalResponse {
	data: null
}
