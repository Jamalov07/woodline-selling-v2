import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsPublicId } from '@common'
import { ProductOptional, ProductRequired } from '../interfaces'
import { $Enums, ProductDirection, ProductType } from '@prisma/client'

export class ProductRequiredDto extends DefaultRequiredFieldsDto implements ProductRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	tissue: string

	@ApiProperty({ enum: ProductDirection })
	@IsNotEmpty()
	@IsEnum(ProductDirection)
	direction: $Enums.ProductDirection

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsPublicId()
	publicId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	modelId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ enum: ProductType })
	@IsNotEmpty()
	@IsEnum(ProductType)
	type: $Enums.ProductType
}

export class ProductOptionalDto extends DefaultOptionalFieldsDto implements ProductOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	tissue?: string

	@ApiPropertyOptional({ enum: ProductDirection })
	@IsOptional()
	@IsEnum(ProductDirection)
	direction?: $Enums.ProductDirection

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsPublicId()
	publicId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	modelId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ enum: ProductType })
	@IsOptional()
	@IsEnum(ProductType)
	type: $Enums.ProductType
}
