import { IntersectionType, PickType } from '@nestjs/swagger'
import { TransferCreateOneRequest, TransferDeleteOneRequest, TransferFindManyRequest, TransferFindOneRequest, TransferUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { TransferOptionalDto, TransferRequiredDto } from './fields.dtos'

export class TransferFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(TransferOptionalDto, ['toStorehouseId', 'fromStorehouseId', 'toStorekeeperId', 'fromStorekeeperId', 'status']),
	)
	implements TransferFindManyRequest {}

export class TransferFindOneRequestDto extends PickType(TransferRequiredDto, ['id']) implements TransferFindOneRequest {}

export class TransferCreateOneRequestDto
	extends PickType(TransferRequiredDto, ['toStorehouseId', 'fromStorehouseId', 'toStorekeeperId', 'fromStorekeeperId'])
	implements TransferCreateOneRequest {}

export class TransferUpdateOneRequestDto
	extends PickType(TransferOptionalDto, ['toStorehouseId', 'deletedAt', 'fromStorehouseId', 'toStorekeeperId', 'fromStorekeeperId', 'status'])
	implements TransferUpdateOneRequest {}

export class TransferDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(TransferRequiredDto, ['id']))
	implements TransferDeleteOneRequest {}
