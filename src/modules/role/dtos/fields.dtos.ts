import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '../../../common'
import { RoleOptional, RoleRequired } from '../interfaces'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { RoleName } from '@prisma/client'

export class RoleRequiredDto implements RoleRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	name: RoleName
}

export class RoleOptionalDto implements RoleOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	name?: RoleName
}
