import { GlobalResponse, PaginationResponse } from '../../../common'
import { ProviderStorehouseRequired } from './fields.interfaces'

export declare interface ProviderStorehouseFindManyData extends PaginationResponse<ProviderStorehouseFindOneData> {}

export declare interface ProviderStorehouseFindManyResponse extends GlobalResponse {
	data: ProviderStorehouseFindManyData
}

export declare interface ProviderStorehouseFindOneData extends Pick<ProviderStorehouseRequired, 'storehouseId' | 'providerId'> {}

export declare interface ProviderStorehouseFindOneResponse extends GlobalResponse {
	data: ProviderStorehouseFindOneData
}

export declare interface ProviderStorehouseModifyResposne extends GlobalResponse {
	data: null
}
