import { IntersectionType, PickType } from '@nestjs/swagger'
import {
	ProductStatusMVCreateOneRequest,
	ProductStatusMVDeleteOneRequest,
	ProductStatusMVFindManyRequest,
	ProductStatusMVFindOneRequest,
	ProductStatusMVUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { ProductStatusMVOptionalDto, ProductStatusMVRequiredDto } from './fields.dtos'

export class ProductStatusMVFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(ProductStatusMVOptionalDto, ['productMVId', 'status']))
	implements ProductStatusMVFindManyRequest {}

export class ProductStatusMVFindOneRequestDto extends PickType(ProductStatusMVRequiredDto, ['id']) implements ProductStatusMVFindOneRequest {}

export class ProductStatusMVCreateOneRequestDto extends PickType(ProductStatusMVRequiredDto, ['productMVId', 'status', 'quantity']) implements ProductStatusMVCreateOneRequest {}

export class ProductStatusMVUpdateOneRequestDto
	extends PickType(ProductStatusMVOptionalDto, ['productMVId', 'status', 'quantity', 'isAccepted', 'deletedAt'])
	implements ProductStatusMVUpdateOneRequest {}

export class ProductStatusMVDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(ProductStatusMVRequiredDto, ['id']))
	implements ProductStatusMVDeleteOneRequest {}
