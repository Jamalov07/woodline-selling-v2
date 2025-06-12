import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { ProductStatusMVOptional, ProductStatusMVRequired } from '../interfaces'
import { $Enums, ProductMVStatus } from '@prisma/client'

export class ProductStatusMVRequiredDto extends DefaultRequiredFieldsDto implements ProductStatusMVRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	productMVId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ enum: ProductMVStatus })
	@IsNotEmpty()
	@IsEnum(ProductMVStatus)
	status: $Enums.ProductMVStatus

	@ApiProperty({ type: Boolean })
	@IsNotEmpty()
	@IsBoolean()
	isAccepted: boolean
}

export class ProductStatusMVOptionalDto extends DefaultOptionalFieldsDto implements ProductStatusMVOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	productMVId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ enum: ProductMVStatus })
	@IsOptional()
	@IsEnum(ProductMVStatus)
	status?: $Enums.ProductMVStatus

	@ApiPropertyOptional({ type: Boolean })
	@IsOptional()
	@IsBoolean()
	isAccepted?: boolean
}
