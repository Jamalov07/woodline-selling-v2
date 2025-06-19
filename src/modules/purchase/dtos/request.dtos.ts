import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { PurchaseCreateOneRequest, PurchaseDeleteOneRequest, PurchaseFindManyRequest, PurchaseFindOneRequest, PurchaseProduct, PurchaseUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '../../../common'
import { PurchaseOptionalDto, PurchaseRequiredDto } from './fields.dtos'
import { $Enums, ProductMVStatus } from '@prisma/client'
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class PurchaseFindManyRequestDto
	extends IntersectionType(
		PaginationRequestDto,
		PickType(RequestOtherFieldsDto, ['isDeleted']),
		PickType(PurchaseOptionalDto, ['providerId', 'storehouseId', 'storekeeperId', 'status']),
	)
	implements PurchaseFindManyRequest {}

export class PurchaseFindOneRequestDto extends PickType(PurchaseRequiredDto, ['id']) implements PurchaseFindOneRequest {}

export class PurchaseProductDto implements PurchaseProduct {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	id: string
	@ApiProperty({ enum: ProductMVStatus })
	@IsNotEmpty()
	@IsEnum(ProductMVStatus)
	status: $Enums.ProductMVStatus

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number
}

export class PurchaseCreateOneRequestDto extends PickType(PurchaseRequiredDto, ['providerId', 'storehouseId']) implements PurchaseCreateOneRequest {
	@ApiProperty({ type: PurchaseProductDto })
	@ValidateNested({ each: true })
	@Type(() => PurchaseProductDto)
	@IsArray()
	@ArrayNotEmpty()
	productMVs: PurchaseProduct[]
}

export class PurchaseUpdateOneRequestDto
	extends PickType(PurchaseOptionalDto, ['providerId', 'deletedAt', 'storehouseId', 'storekeeperId', 'status'])
	implements PurchaseUpdateOneRequest {}

export class PurchaseDeleteOneRequestDto
	extends IntersectionType(PickType(RequestOtherFieldsDto, ['isDeleted']), PickType(PurchaseRequiredDto, ['id']))
	implements PurchaseDeleteOneRequest {}
