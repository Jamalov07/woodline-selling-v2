import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	ProviderStorehouseFindManyData,
	ProviderStorehouseFindManyResponse,
	ProviderStorehouseFindOneData,
	ProviderStorehouseFindOneResponse,
	ProviderStorehouseModifyResposne,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProviderStorehouseRequiredDto } from './fields.dtos'

export class ProviderStorehouseFindOneDataDto extends PickType(ProviderStorehouseRequiredDto, ['providerId', 'storehouseId']) implements ProviderStorehouseFindOneData {}

export class ProviderStorehouseFindManyDataDto extends PaginationResponseDto implements ProviderStorehouseFindManyData {
	@ApiProperty({ type: ProviderStorehouseFindOneDataDto, isArray: true })
	data: ProviderStorehouseFindOneData[]
}

export class ProviderStorehouseFindManyResponseDto extends GlobalResponseDto implements ProviderStorehouseFindManyResponse {
	@ApiProperty({ type: ProviderStorehouseFindManyDataDto })
	data: ProviderStorehouseFindManyData
}

export class ProviderStorehouseFindOneResponseDto extends GlobalResponseDto implements ProviderStorehouseFindOneResponse {
	@ApiProperty({ type: ProviderStorehouseFindOneDataDto })
	data: ProviderStorehouseFindOneData
}

export class ProviderStorehouseModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProviderStorehouseModifyResposne {}
