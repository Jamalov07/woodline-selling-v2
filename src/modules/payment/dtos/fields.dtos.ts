import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsDecimalIntOrBigInt } from '@common'
import { PaymentOptional, PaymentRequired } from '../interfaces'
import { $Enums, PaymentCurrency, PaymentMethod } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class PaymentRequiredDto extends DefaultRequiredFieldsDto implements PaymentRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	orderId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	sum: Decimal

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	totalSum: Decimal

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	exchangeRate: Decimal

	@ApiProperty({ enum: PaymentCurrency })
	@IsNotEmpty()
	@IsEnum(PaymentCurrency)
	fromCurrency: $Enums.PaymentCurrency

	@ApiProperty({ enum: PaymentCurrency })
	@IsNotEmpty()
	@IsEnum(PaymentCurrency)
	toCurrency: $Enums.PaymentCurrency

	@ApiProperty({ enum: PaymentMethod })
	@IsNotEmpty()
	@IsEnum(PaymentMethod)
	method: $Enums.PaymentMethod
}

export class PaymentOptionalDto extends DefaultOptionalFieldsDto implements PaymentOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	orderId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	sum?: Decimal

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	totalSum?: Decimal

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	exchangeRate?: Decimal

	@ApiPropertyOptional({ enum: PaymentCurrency })
	@IsOptional()
	@IsEnum(PaymentCurrency)
	fromCurrency?: $Enums.PaymentCurrency

	@ApiPropertyOptional({ enum: PaymentCurrency })
	@IsOptional()
	@IsEnum(PaymentCurrency)
	toCurrency?: $Enums.PaymentCurrency

	@ApiPropertyOptional({ enum: PaymentMethod })
	@IsOptional()
	@IsEnum(PaymentMethod)
	method?: $Enums.PaymentMethod
}
