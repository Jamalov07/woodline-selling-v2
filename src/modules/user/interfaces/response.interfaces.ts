import { GlobalResponse, PaginationResponse } from '@common'
import { UserRequired } from './fields.interfaces'

export declare interface UserFindManyData extends PaginationResponse<UserFindOneData> {}

export declare interface UserFindOneData extends Pick<UserRequired, 'id' | 'fullname' | 'createdAt' | 'phone'> {
	actionIds?: string[]
}

export declare interface UserFindManyResponse extends GlobalResponse {
	data: UserFindManyData
}

export declare interface UserFindOneResponse extends GlobalResponse {
	data: UserFindOneData
}

export declare interface UserModifyResposne extends GlobalResponse {
	data: null
}
