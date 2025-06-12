import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { PurchaseFindManyData, PurchaseFindManyResponse, PurchaseFindOneData, PurchaseFindOneResponse, PurchaseModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { PurchaseRequiredDto } from './fields.dtos'

export class PurchaseFindOneDataDto extends PickType(PurchaseRequiredDto, ['id', 'status', 'createdAt']) implements PurchaseFindOneData {}

export class PurchaseFindManyDataDto extends PaginationResponseDto implements PurchaseFindManyData {
	@ApiProperty({ type: PurchaseFindOneDataDto, isArray: true })
	data: PurchaseFindOneData[]
}

export class PurchaseFindManyResponseDto extends GlobalResponseDto implements PurchaseFindManyResponse {
	@ApiProperty({ type: PurchaseFindManyDataDto })
	data: PurchaseFindManyData
}

export class PurchaseFindOneResponseDto extends GlobalResponseDto implements PurchaseFindOneResponse {
	@ApiProperty({ type: PurchaseFindOneDataDto })
	data: PurchaseFindOneData
}

export class PurchaseModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements PurchaseModifyResposne {}
