import { ApiPropertyOptional, IntersectionType, PickType } from '@nestjs/swagger'
import { OrderProductCreateOneRequest, OrderProductDeleteOneRequest, OrderProductFindManyRequest, OrderProductFindOneRequest, OrderProductUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderProductOptionalDto, OrderProductRequiredDto } from './fields.dtos'
import { ProductCreateOneRequest, ProductCreateOneRequestDto } from '../../product'
import { IsOptional, IsUUID } from 'class-validator'

export class OrderProductFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['ids', 'isDeleted']), PickType(OrderProductOptionalDto, ['spsId', 'sellerId']))
	implements OrderProductFindManyRequest
{
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	providerId?: string
}

export class OrderProductFindOneRequestDto extends PickType(OrderProductRequiredDto, ['id']) implements OrderProductFindOneRequest {}

export class OrderProductCreateOneRequestDto
	extends PickType(OrderProductRequiredDto, ['quantity', 'description', 'price', 'priceWithSale', 'sale', 'totalSum', 'orderId'])
	implements OrderProductCreateOneRequest
{
	@ApiPropertyOptional({ type: ProductCreateOneRequestDto })
	productDetail?: ProductCreateOneRequest
}

export class OrderProductUpdateOneRequestDto
	extends PickType(OrderProductOptionalDto, ['quantity', 'spsId', 'deletedAt', 'description', 'price', 'priceWithSale', 'sale', 'totalSum', 'orderId', 'status'])
	implements OrderProductUpdateOneRequest
{
	@ApiPropertyOptional({ type: ProductCreateOneRequestDto })
	productDetail?: ProductCreateOneRequest
}

export class OrderProductDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderProductRequiredDto, ['id']))
	implements OrderProductDeleteOneRequest {}
