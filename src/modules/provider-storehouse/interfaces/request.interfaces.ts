import { PaginationRequest } from '../../../common'
import { ProviderStorehouseOptional, ProviderStorehouseRequired } from './fields.interfaces'

export declare interface ProviderStorehouseFindManyRequest extends PaginationRequest, Pick<ProviderStorehouseOptional, 'providerId' | 'storehouseId'> {}

export declare interface ProviderStorehouseFindOneRequest extends Pick<ProviderStorehouseRequired, 'providerId'> {}

export declare interface ProviderStorehouseGetManyRequest extends PaginationRequest, ProviderStorehouseOptional {}

export declare interface ProviderStorehouseGetOneRequest extends ProviderStorehouseOptional {}

export declare interface ProviderStorehouseCreateOneRequest extends Pick<ProviderStorehouseRequired, 'providerId' | 'storehouseId'> {}

export declare interface ProviderStorehouseUpdateOneRequest extends Pick<ProviderStorehouseOptional, 'providerId' | 'storehouseId'> {}

export declare interface ProviderStorehouseDeleteOneRequest extends Pick<ProviderStorehouseOptional, 'providerId'> {}
