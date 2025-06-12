import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { StorehouseFindManyData, StorehouseFindManyResponse, StorehouseFindOneData, StorehouseFindOneResponse, StorehouseModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { StorehouseRequiredDto } from './fields.dtos'

export class StorehouseFindOneDataDto extends PickType(StorehouseRequiredDto, ['id', 'name', 'createdAt']) implements StorehouseFindOneData {}

export class StorehouseFindManyDataDto extends PaginationResponseDto implements StorehouseFindManyData {
	@ApiProperty({ type: StorehouseFindOneDataDto, isArray: true })
	data: StorehouseFindOneData[]
}

export class StorehouseFindManyResponseDto extends GlobalResponseDto implements StorehouseFindManyResponse {
	@ApiProperty({ type: StorehouseFindManyDataDto })
	data: StorehouseFindManyData
}

export class StorehouseFindOneResponseDto extends GlobalResponseDto implements StorehouseFindOneResponse {
	@ApiProperty({ type: StorehouseFindOneDataDto })
	data: StorehouseFindOneData
}

export class StorehouseModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StorehouseModifyResposne {}
