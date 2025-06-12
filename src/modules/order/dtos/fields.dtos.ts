import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { OrderOptional, OrderRequired } from '../interfaces'
import { $Enums, ClientPStatus, InventoryStatus } from '@prisma/client'

export class OrderRequiredDto extends DefaultRequiredFieldsDto implements OrderRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	deliveryAddress: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsDateString()
	deliveryDate: Date

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	clientId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	sellerId: string

	@ApiProperty({ enum: InventoryStatus })
	@IsNotEmpty()
	@IsEnum(InventoryStatus)
	status: $Enums.InventoryStatus

	@ApiProperty({ enum: ClientPStatus })
	@IsNotEmpty()
	@IsEnum(ClientPStatus)
	clientPStatus: $Enums.ClientPStatus
}

export class OrderOptionalDto extends DefaultOptionalFieldsDto implements OrderOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsString()
	deliveryAddress?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsDateString()
	deliveryDate?: Date

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	clientId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	sellerId?: string

	@ApiPropertyOptional({ enum: InventoryStatus })
	@IsOptional()
	@IsEnum(InventoryStatus)
	status?: $Enums.InventoryStatus

	@ApiPropertyOptional({ enum: ClientPStatus })
	@IsOptional()
	@IsEnum(ClientPStatus)
	clientPStatus?: $Enums.ClientPStatus
}
