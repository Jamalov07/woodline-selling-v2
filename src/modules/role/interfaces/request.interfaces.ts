import { PaginationRequest, RequestOtherFields } from '@common'
import { RoleOptional } from './fields.interfaces'

export declare interface RoleFindManyRequest extends Pick<RoleOptional, 'name'>, PaginationRequest {}

export declare interface RoleFindOneRequest extends Pick<RoleOptional, 'name'> {}

export declare interface RoleGetManyRequest extends Pick<RoleOptional, 'name'>, PaginationRequest {}

export declare interface RoleGetOneRequest extends Pick<RoleOptional, 'name'> {}

export declare interface RoleUpdateOneRequest extends Pick<RequestOtherFields, 'actionsToConnect' | 'actionsToDisconnect'> {}
