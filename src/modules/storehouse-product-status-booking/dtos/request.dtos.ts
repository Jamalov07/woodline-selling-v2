import { IntersectionType, PickType } from '@nestjs/swagger'
import { SPSBookingCreateOneRequest, SPSBookingDeleteOneRequest, SPSBookingFindManyRequest, SPSBookingFindOneRequest, SPSBookingUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { SPSBookingOptionalDto, SPSBookingRequiredDto } from './fields.dtos'

export class SPSBookingFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SPSBookingOptionalDto, ['spsId', 'sellerId']))
	implements SPSBookingFindManyRequest {}

export class SPSBookingFindOneRequestDto extends PickType(SPSBookingRequiredDto, ['id']) implements SPSBookingFindOneRequest {}

export class SPSBookingCreateOneRequestDto extends PickType(SPSBookingRequiredDto, ['spsId', 'quantity']) implements SPSBookingCreateOneRequest {}

export class SPSBookingUpdateOneRequestDto extends PickType(SPSBookingOptionalDto, ['spsId', 'sellerId', 'quantity', 'deletedAt']) implements SPSBookingUpdateOneRequest {}

export class SPSBookingDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(SPSBookingRequiredDto, ['id']))
	implements SPSBookingDeleteOneRequest {}
