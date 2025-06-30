import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import { CartCreateOneRequest, CartDeleteOneRequest, CartFindManyRequest, CartFindOneRequest, CartUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { CartOptionalDto, CartRequiredDto } from './fields.dtos'
import { ProductCreateOneRequest, ProductCreateOneRequestDto } from '../../product'
import { IsOptional, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CartFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']), PickType(CartOptionalDto, ['spsId', 'sellerId']))
	implements CartFindManyRequest {}

export class CartFindOneRequestDto extends PickType(CartRequiredDto, ['id']) implements CartFindOneRequest {}

export class CartCreateOneRequestDto
	extends IntersectionType(PickType(CartRequiredDto, ['price', 'priceWithSale', 'sale', 'totalSum']), PickType(CartOptionalDto, ['quantity', 'spsId', 'description']))
	implements CartCreateOneRequest
{
	@ApiProperty({ type: OmitType(ProductCreateOneRequestDto, ['description']) })
	@ValidateNested()
	@Type(() => OmitType(ProductCreateOneRequestDto, ['description']))
	@IsOptional()
	productDetail?: Omit<ProductCreateOneRequest, 'description'>
}

export class CartUpdateOneRequestDto
	extends PickType(CartOptionalDto, ['quantity', 'spsId', 'deletedAt', 'description', 'price', 'priceWithSale', 'sale', 'totalSum'])
	implements CartUpdateOneRequest
{
	@ApiProperty({ type: OmitType(ProductCreateOneRequestDto, ['description']) })
	@ValidateNested()
	@Type(() => OmitType(ProductCreateOneRequestDto, ['description', 'publicId']))
	@IsOptional()
	productDetail?: Omit<ProductCreateOneRequest, 'description' | 'publicId'>
}

export class CartDeleteOneRequestDto extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(CartRequiredDto, ['id'])) implements CartDeleteOneRequest {}
