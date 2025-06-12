import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { StorehouseOptional, StorehouseRequired } from '../interfaces'
import { $Enums, StorehouseType } from '@prisma/client'

export class StorehouseRequiredDto extends DefaultRequiredFieldsDto implements StorehouseRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ enum: StorehouseType })
	@IsNotEmpty()
	@IsEnum(StorehouseType)
	type: $Enums.StorehouseType
}

export class StorehouseOptionalDto extends DefaultOptionalFieldsDto implements StorehouseOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ enum: StorehouseType })
	@IsOptional()
	@IsEnum(StorehouseType)
	type?: $Enums.StorehouseType
}
