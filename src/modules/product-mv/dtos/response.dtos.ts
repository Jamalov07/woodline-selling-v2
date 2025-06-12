import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { ProductMVFindManyData, ProductMVFindManyResponse, ProductMVFindOneData, ProductMVFindOneResponse, ProductMVModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { ProductMVRequiredDto } from './fields.dtos'

export class ProductMVFindOneDataDto extends PickType(ProductMVRequiredDto, ['id', 'createdAt']) implements ProductMVFindOneData {}

export class ProductMVFindManyDataDto extends PaginationResponseDto implements ProductMVFindManyData {
	@ApiProperty({ type: ProductMVFindOneDataDto, isArray: true })
	data: ProductMVFindOneData[]
}

export class ProductMVFindManyResponseDto extends GlobalResponseDto implements ProductMVFindManyResponse {
	@ApiProperty({ type: ProductMVFindManyDataDto })
	data: ProductMVFindManyData
}

export class ProductMVFindOneResponseDto extends GlobalResponseDto implements ProductMVFindOneResponse {
	@ApiProperty({ type: ProductMVFindOneDataDto })
	data: ProductMVFindOneData
}

export class ProductMVModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements ProductMVModifyResposne {}
