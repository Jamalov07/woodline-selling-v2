import { IntersectionType, PickType } from '@nestjs/swagger'
import { StorehouseCreateOneRequest, StorehouseDeleteOneRequest, StorehouseFindManyRequest, StorehouseFindOneRequest, StorehouseUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { StorehouseOptionalDto, StorehouseRequiredDto } from './fields.dtos'

export class StorehouseFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(StorehouseOptionalDto, ['name', 'type']))
	implements StorehouseFindManyRequest {}

export class StorehouseFindOneRequestDto extends PickType(StorehouseRequiredDto, ['id']) implements StorehouseFindOneRequest {}

export class StorehouseCreateOneRequestDto extends PickType(StorehouseRequiredDto, ['name', 'type']) implements StorehouseCreateOneRequest {}

export class StorehouseUpdateOneRequestDto extends PickType(StorehouseOptionalDto, ['name', 'type', 'deletedAt']) implements StorehouseUpdateOneRequest {}

export class StorehouseDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(StorehouseRequiredDto, ['id']))
	implements StorehouseDeleteOneRequest {}
