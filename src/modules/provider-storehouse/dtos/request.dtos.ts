import { IntersectionType, PickType } from '@nestjs/swagger'
import {
	ProviderStorehouseCreateOneRequest,
	ProviderStorehouseDeleteOneRequest,
	ProviderStorehouseFindManyRequest,
	ProviderStorehouseFindOneRequest,
	ProviderStorehouseUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto } from '../../../common'
import { ProviderStorehouseOptionalDto, ProviderStorehouseRequiredDto } from './fields.dtos'

export class ProviderStorehouseFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(ProviderStorehouseOptionalDto, ['providerId', 'storehouseId']))
	implements ProviderStorehouseFindManyRequest {}

export class ProviderStorehouseFindOneRequestDto extends PickType(ProviderStorehouseRequiredDto, ['providerId']) implements ProviderStorehouseFindOneRequest {}

export class ProviderStorehouseCreateOneRequestDto extends PickType(ProviderStorehouseRequiredDto, ['providerId', 'storehouseId']) implements ProviderStorehouseCreateOneRequest {}

export class ProviderStorehouseUpdateOneRequestDto extends PickType(ProviderStorehouseOptionalDto, ['providerId', 'storehouseId']) implements ProviderStorehouseUpdateOneRequest {}

export class ProviderStorehouseDeleteOneRequestDto
	extends IntersectionType(PickType(ProviderStorehouseRequiredDto, ['providerId']))
	implements ProviderStorehouseDeleteOneRequest {}
