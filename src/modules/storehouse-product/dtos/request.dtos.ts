import { $Enums, SPStatus } from '@prisma/client'
import { ApiPropertyOptional, IntersectionType, PickType } from '@nestjs/swagger'
import {
	StorehouseProductCreateOneRequest,
	StorehouseProductDeleteOneRequest,
	StorehouseProductFindManyRequest,
	StorehouseProductFindOneRequest,
	StorehouseProductUpdateOneRequest,
} from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { StorehouseProductOptionalDto, StorehouseProductRequiredDto } from './fields.dtos'
import { IsArray, IsBoolean, IsEnum, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class StorehouseProductFindManyRequestDto
	extends IntersectionType(PaginationRequestDto, PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(StorehouseProductOptionalDto, ['productId', 'storehouseId']))
	implements StorehouseProductFindManyRequest
{
	@ApiPropertyOptional({ enum: SPStatus, isArray: true })
	@IsOptional()
	@IsArray()
	@IsEnum(SPStatus, { each: true })
	statuses?: $Enums.SPStatus[]

	@ApiPropertyOptional({ type: Boolean })
	@Transform(({ value }) => ([false, 'false'].includes(value) ? false : [true, 'true'].includes(value) ? true : undefined))
	@IsBoolean()
	@IsOptional()
	isBooked?: boolean

	@ApiPropertyOptional({ type: Boolean })
	@Transform(({ value }) => ([false, 'false'].includes(value) ? false : [true, 'true'].includes(value) ? true : undefined))
	@IsBoolean()
	@IsOptional()
	bookedByMe?: boolean
}

export class StorehouseProductFindOneRequestDto extends PickType(StorehouseProductRequiredDto, ['id']) implements StorehouseProductFindOneRequest {}

export class StorehouseProductCreateOneRequestDto extends PickType(StorehouseProductRequiredDto, ['productId', 'storehouseId']) implements StorehouseProductCreateOneRequest {}

export class StorehouseProductUpdateOneRequestDto
	extends PickType(StorehouseProductOptionalDto, ['productId', 'storehouseId', 'deletedAt'])
	implements StorehouseProductUpdateOneRequest {}

export class StorehouseProductDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(StorehouseProductRequiredDto, ['id']))
	implements StorehouseProductDeleteOneRequest {}
