import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto, IsDecimalIntOrBigInt } from '../../../common'
import { UserOptional, UserRequired } from '../interfaces'
import { IsJWT, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { Decimal } from '@prisma/client/runtime/library'

export class UserRequiredDto extends DefaultRequiredFieldsDto implements UserRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	fullname: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	password: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsPhoneNumber('UZ')
	phone: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsJWT()
	token: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsDecimalIntOrBigInt()
	balance: Decimal

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	source: string
}

export class UserOptionalDto extends DefaultOptionalFieldsDto implements UserOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	fullname?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	password?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsPhoneNumber('UZ')
	phone?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsJWT()
	token?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsDecimalIntOrBigInt()
	balance?: Decimal

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	source?: string
}
