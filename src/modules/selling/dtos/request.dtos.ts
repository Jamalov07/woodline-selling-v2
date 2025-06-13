import { IntersectionType, PickType } from '@nestjs/swagger'
import { SellingCreateOneRequest, SellingDeleteOneRequest, SellingFindManyRequest, SellingFindOneRequest, SellingUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { SellingOptionalDto, SellingRequiredDto } from './fields.dtos'

export class SellingFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(SellingOptionalDto, ['orderProductId', 'storehouseId', 'storekeeperId', 'isAccepted']),
	)
	implements SellingFindManyRequest {}

export class SellingFindOneRequestDto extends PickType(SellingRequiredDto, ['id']) implements SellingFindOneRequest {}

export class SellingCreateOneRequestDto extends PickType(SellingRequiredDto, ['orderProductId', 'storehouseId', 'storekeeperId']) implements SellingCreateOneRequest {}

export class SellingUpdateOneRequestDto
	extends PickType(SellingOptionalDto, ['orderProductId', 'deletedAt', 'storehouseId', 'storekeeperId', 'isAccepted'])
	implements SellingUpdateOneRequest {}

export class SellingDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SellingRequiredDto, ['id']))
	implements SellingDeleteOneRequest {}
