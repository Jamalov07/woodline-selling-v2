import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { SPSBookingOptional, SPSBookingRequired } from '../interfaces'

export class SPSBookingRequiredDto extends DefaultRequiredFieldsDto implements SPSBookingRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	spsId: string

	@ApiProperty({ type: Number })
	@IsNotEmpty()
	@IsNumber()
	quantity: number

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	sellerId: string
}

export class SPSBookingOptionalDto extends DefaultOptionalFieldsDto implements SPSBookingOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	spsId?: string

	@ApiPropertyOptional({ type: Number })
	@IsOptional()
	@IsNumber()
	quantity?: number

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	sellerId?: string
}
