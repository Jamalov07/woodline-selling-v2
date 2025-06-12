import { GlobalResponse, PaginationResponse } from '../../../common'
import { FurnitureTypeFindOneData } from '../../furniture-type'
import { UserFindOneData } from '../../user'
import { ModelRequired } from './fields.interfaces'

export declare interface ModelFindManyData extends PaginationResponse<ModelFindOneData> {}

export declare interface ModelFindManyResponse extends GlobalResponse {
	data: ModelFindManyData
}

export declare interface ModelFindOneData extends Pick<ModelRequired, 'id' | 'name' | 'createdAt'> {
	furnitureType?: FurnitureTypeFindOneData
	provider?: UserFindOneData
}

export declare interface ModelFindOneResponse extends GlobalResponse {
	data: ModelFindOneData
}

export declare interface ModelModifyResposne extends GlobalResponse {
	data: null
}
