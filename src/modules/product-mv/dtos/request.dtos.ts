import { IntersectionType, PickType } from '@nestjs/swagger'
import { ProductMVCreateOneRequest, ProductMVDeleteOneRequest, ProductMVFindManyRequest, ProductMVFindOneRequest, ProductMVUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { ProductMVOptionalDto, ProductMVRequiredDto } from './fields.dtos'

export class ProductMVFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(ProductMVOptionalDto, ['productId', 'purchaseId', 'transferId', 'type']))
	implements ProductMVFindManyRequest {}

export class ProductMVFindOneRequestDto extends PickType(ProductMVRequiredDto, ['id']) implements ProductMVFindOneRequest {}

export class ProductMVCreateOneRequestDto
	extends PickType(ProductMVRequiredDto, ['productId', 'sellingId', 'purchaseId', 'transferId', 'type'])
	implements ProductMVCreateOneRequest {}

export class ProductMVUpdateOneRequestDto
	extends PickType(ProductMVOptionalDto, ['productId', 'sellingId', 'purchaseId', 'transferId', 'type', 'deletedAt'])
	implements ProductMVUpdateOneRequest {}

export class ProductMVDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(ProductMVRequiredDto, ['id']))
	implements ProductMVDeleteOneRequest {}
