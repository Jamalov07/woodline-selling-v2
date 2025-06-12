import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { SPSOptional, SPSRequired } from '../interfaces'
import { $Enums, SPStatus } from '@prisma/client'

export class SPSRequiredDto extends DefaultRequiredFieldsDto implements SPSRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	spId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ enum: SPStatus })
	@IsNotEmpty()
	@IsEnum(SPStatus)
	status: $Enums.SPStatus
}

export class SPSOptionalDto extends DefaultOptionalFieldsDto implements SPSOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	spId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ enum: SPStatus })
	@IsOptional()
	@IsEnum(SPStatus)
	status?: $Enums.SPStatus
}
