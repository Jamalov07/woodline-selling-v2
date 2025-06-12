import { PaginationRequest, RequestOtherFields } from '@common'
import { UserOptional, UserRequired } from './fields.interfaces'

export declare interface UserFindManyRequest extends Pick<UserOptional, 'fullname' | 'phone'>, PaginationRequest, Pick<RequestOtherFields, 'isDeleted' | 'search' | 'roleNames'> {}

export declare interface UserFindOneRequest extends Pick<UserOptional, 'id'> {}

export declare interface UserGetManyRequest extends UserOptional, PaginationRequest, Pick<RequestOtherFields, 'ids' | 'isDeleted'> {}

export declare interface UserGetOneRequest extends UserOptional, Pick<RequestOtherFields, 'isDeleted'> {}

export declare interface UserCreateOneRequest
	extends Pick<UserRequired, 'fullname' | 'phone' | 'password'>,
		Pick<UserOptional, 'source'>,
		Pick<RequestOtherFields, 'actionsToConnect' | 'rolesToConnect'> {
	storehouseId?: string
}

export declare interface UserUpdateOneRequest
	extends Pick<UserOptional, 'fullname' | 'id' | 'password' | 'phone' | 'token' | 'balance' | 'source' | 'deletedAt'>,
		Pick<RequestOtherFields, 'actionsToConnect' | 'actionsToDisconnect' | 'rolesToConnect' | 'rolesToDisconnect'> {
	storehouseId?: string
}

export declare interface UserDeleteOneRequest extends Pick<UserOptional, 'id'>, Pick<RequestOtherFields, 'method'> {}
