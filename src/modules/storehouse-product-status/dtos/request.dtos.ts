import { IntersectionType, PickType } from '@nestjs/swagger'
import { SPSCreateOneRequest, SPSDeleteOneRequest, SPSFindManyRequest, SPSFindOneRequest, SPSUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { SPSOptionalDto, SPSRequiredDto } from './fields.dtos'

export class SPSFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SPSOptionalDto, ['spId', 'status']))
	implements SPSFindManyRequest {}

export class SPSFindOneRequestDto extends PickType(SPSRequiredDto, ['id']) implements SPSFindOneRequest {}

export class SPSCreateOneRequestDto extends PickType(SPSRequiredDto, ['spId', 'status', 'quantity']) implements SPSCreateOneRequest {}

export class SPSUpdateOneRequestDto extends PickType(SPSOptionalDto, ['spId', 'status', 'quantity', 'deletedAt']) implements SPSUpdateOneRequest {}

export class SPSDeleteOneRequestDto extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SPSRequiredDto, ['id'])) implements SPSDeleteOneRequest {}
