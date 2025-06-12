import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	StorehouseProductFindManyData,
	StorehouseProductFindManyResponse,
	StorehouseProductFindOneData,
	StorehouseProductFindOneResponse,
	StorehouseProductModifyResposne,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { StorehouseProductRequiredDto } from './fields.dtos'

export class StorehouseProductFindOneDataDto extends PickType(StorehouseProductRequiredDto, ['id', 'createdAt']) implements StorehouseProductFindOneData {}

export class StorehouseProductFindManyDataDto extends PaginationResponseDto implements StorehouseProductFindManyData {
	@ApiProperty({ type: StorehouseProductFindOneDataDto, isArray: true })
	data: StorehouseProductFindOneData[]
}

export class StorehouseProductFindManyResponseDto extends GlobalResponseDto implements StorehouseProductFindManyResponse {
	@ApiProperty({ type: StorehouseProductFindManyDataDto })
	data: StorehouseProductFindManyData
}

export class StorehouseProductFindOneResponseDto extends GlobalResponseDto implements StorehouseProductFindOneResponse {
	@ApiProperty({ type: StorehouseProductFindOneDataDto })
	data: StorehouseProductFindOneData
}

export class StorehouseProductModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements StorehouseProductModifyResposne {}
