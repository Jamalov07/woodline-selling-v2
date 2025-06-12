import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { ProductMVOptional, ProductMVRequired } from '../interfaces'
import { $Enums, ProductMVType } from '@prisma/client'

export class ProductMVRequiredDto extends DefaultRequiredFieldsDto implements ProductMVRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	productId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	sellingId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	transferId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	purchaseId: string

	@ApiProperty({ enum: ProductMVType })
	@IsNotEmpty()
	@IsEnum(ProductMVType)
	type: $Enums.ProductMVType
}

export class ProductMVOptionalDto extends DefaultOptionalFieldsDto implements ProductMVOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	productId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	sellingId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	transferId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	purchaseId?: string

	@ApiPropertyOptional({ enum: ProductMVType })
	@IsOptional()
	@IsEnum(ProductMVType)
	type?: $Enums.ProductMVType
}
