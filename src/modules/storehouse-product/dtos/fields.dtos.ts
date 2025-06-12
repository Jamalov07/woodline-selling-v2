import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { StorehouseProductOptional, StorehouseProductRequired } from '../interfaces'

export class StorehouseProductRequiredDto extends DefaultRequiredFieldsDto implements StorehouseProductRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	productId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	storehouseId: string
}

export class StorehouseProductOptionalDto extends DefaultOptionalFieldsDto implements StorehouseProductOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	productId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	storehouseId?: string
}
