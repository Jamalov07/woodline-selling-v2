import { ApiProperty, IntersectionType, OmitType, PickType } from '@nestjs/swagger'
import {
	OrderCreateOneRequest,
	OrderCreateOneWithPaymentProductRequest,
	OrderDeleteOneRequest,
	OrderFindManyRequest,
	OrderFindOneRequest,
	OrderUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { OrderOptionalDto, OrderRequiredDto } from './fields.dtos'
import { PaymentCreateOneRequest, PaymentCreateOneRequestDto } from '../../payment'
import { OrderProductCreateOneRequestDto } from '../../order-product'
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator'

export class OrderFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['ids', 'isDeleted', 'search']),
		PickType(OrderOptionalDto, ['sellerId', 'clientId', 'deliveryAddress']),
	)
	implements OrderFindManyRequest {}

export class OrderFindOneRequestDto extends PickType(OrderRequiredDto, ['id']) implements OrderFindOneRequest {}

export class OrderCreateOneRequestDto extends PickType(OrderRequiredDto, ['clientId', 'sellerId', 'deliveryAddress', 'deliveryDate']) implements OrderCreateOneRequest {}

class PaymentWithoutOrderIdDto extends OmitType(PaymentCreateOneRequestDto, ['orderId']) {}
export class OrderCreateOneWithPaymentProductRequestDto
	extends PickType(OrderRequiredDto, ['clientId', 'deliveryAddress', 'deliveryDate'])
	implements OrderCreateOneWithPaymentProductRequest
{
	@ApiProperty({ type: PaymentWithoutOrderIdDto, isArray: true })
	@IsNotEmpty()
	@IsArray()
	@IsObject({ each: true })
	payments: Omit<PaymentCreateOneRequest, 'orderId'>[]
}

export class OrderUpdateOneRequestDto extends PickType(OrderOptionalDto, ['clientId', 'status', 'deliveryAddress', 'deliveryDate', 'deletedAt']) implements OrderUpdateOneRequest {}

export class OrderDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(OrderRequiredDto, ['id']))
	implements OrderDeleteOneRequest {}
