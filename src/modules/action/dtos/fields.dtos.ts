import { $Enums, ActionMethod } from '@prisma/client'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { ActionOptional, ActionRequired } from '../interfaces'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ActionRequiredDto extends DefaultRequiredFieldsDto implements ActionRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({ enum: ActionMethod })
	@IsNotEmpty()
	@IsEnum(ActionMethod)
	method: $Enums.ActionMethod

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	url: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	description: string
}

export class ActionOptionalDto extends DefaultOptionalFieldsDto implements ActionOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: string

	@ApiPropertyOptional({ enum: ActionMethod })
	@IsOptional()
	@IsEnum(ActionMethod)
	method?: $Enums.ActionMethod = undefined

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	url?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	description?: string
}
