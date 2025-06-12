import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { TransferFindManyData, TransferFindManyResponse, TransferFindOneData, TransferFindOneResponse, TransferModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { TransferRequiredDto } from './fields.dtos'

export class TransferFindOneDataDto extends PickType(TransferRequiredDto, ['id', 'status', 'createdAt']) implements TransferFindOneData {}

export class TransferFindManyDataDto extends PaginationResponseDto implements TransferFindManyData {
	@ApiProperty({ type: TransferFindOneDataDto, isArray: true })
	data: TransferFindOneData[]
}

export class TransferFindManyResponseDto extends GlobalResponseDto implements TransferFindManyResponse {
	@ApiProperty({ type: TransferFindManyDataDto })
	data: TransferFindManyData
}

export class TransferFindOneResponseDto extends GlobalResponseDto implements TransferFindOneResponse {
	@ApiProperty({ type: TransferFindOneDataDto })
	data: TransferFindOneData
}

export class TransferModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements TransferModifyResposne {}
