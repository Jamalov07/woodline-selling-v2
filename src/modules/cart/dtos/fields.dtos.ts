import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsDecimalIntOrBigInt } from '@common'
import { CartOptional, CartRequired } from '../interfaces'
import { Decimal } from '@prisma/client/runtime/library'
import { $Enums, OrderProductType } from '@prisma/client'

export class CartRequiredDto extends DefaultRequiredFieldsDto implements CartRequired {
	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	spsId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	sellerId: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	price: Decimal

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	priceWithSale: Decimal

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	sale: number

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: BigInt })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	totalSum: Decimal

	@ApiProperty({ enum: OrderProductType })
	@IsNotEmpty()
	@IsEnum(OrderProductType)
	type: $Enums.OrderProductType
}

export class CartOptionalDto extends DefaultOptionalFieldsDto implements CartOptional {
	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	spsId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	sellerId?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	price?: Decimal

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	priceWithSale?: Decimal

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	sale?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: BigInt })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	totalSum?: Decimal

	@ApiPropertyOptional({ enum: OrderProductType })
	@IsOptional()
	@IsEnum(OrderProductType)
	type?: $Enums.OrderProductType
}
