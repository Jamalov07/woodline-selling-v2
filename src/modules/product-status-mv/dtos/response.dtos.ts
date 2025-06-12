import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import {
	ProductStatusMVFindManyData,
	ProductStatusMVFindManyResponse,
	ProductStatusMVFindOneData,
	ProductStatusMVFindOneResponse,
	ProductStatusMVModifyResposne,
} from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProductStatusMVRequiredDto } from './fields.dtos'

export class ProductStatusMVFindOneDataDto extends PickType(ProductStatusMVRequiredDto, ['id', 'createdAt']) implements ProductStatusMVFindOneData {}

export class ProductStatusMVFindManyDataDto extends PaginationResponseDto implements ProductStatusMVFindManyData {
	@ApiProperty({ type: ProductStatusMVFindOneDataDto, isArray: true })
	data: ProductStatusMVFindOneData[]
}

export class ProductStatusMVFindManyResponseDto extends GlobalResponseDto implements ProductStatusMVFindManyResponse {
	@ApiProperty({ type: ProductStatusMVFindManyDataDto })
	data: ProductStatusMVFindManyData
}

export class ProductStatusMVFindOneResponseDto extends GlobalResponseDto implements ProductStatusMVFindOneResponse {
	@ApiProperty({ type: ProductStatusMVFindOneDataDto })
	data: ProductStatusMVFindOneData
}

export class ProductStatusMVModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProductStatusMVModifyResposne {}
