import { IntersectionType, PickType } from '@nestjs/swagger'
import { SellingCreateOneRequest, SellingDeleteOneRequest, SellingFindManyRequest, SellingFindOneRequest, SellingUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { SellingOptionalDto, SellingRequiredDto } from './fields.dtos'

export class SellingFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(SellingOptionalDto, ['orderId', 'storehouseId', 'storekeeperId', 'status']),
	)
	implements SellingFindManyRequest {}

export class SellingFindOneRequestDto extends PickType(SellingRequiredDto, ['id']) implements SellingFindOneRequest {}

export class SellingCreateOneRequestDto extends PickType(SellingRequiredDto, ['orderId', 'storehouseId', 'storekeeperId']) implements SellingCreateOneRequest {}

export class SellingUpdateOneRequestDto
	extends PickType(SellingOptionalDto, ['orderId', 'deletedAt', 'storehouseId', 'storekeeperId', 'status'])
	implements SellingUpdateOneRequest {}

export class SellingDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SellingRequiredDto, ['id']))
	implements SellingDeleteOneRequest {}
