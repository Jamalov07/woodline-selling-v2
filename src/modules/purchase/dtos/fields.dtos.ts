import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { PurchaseOptional, PurchaseRequired } from '../interfaces'
import { $Enums, InventoryStatus } from '@prisma/client'

export class PurchaseRequiredDto extends DefaultRequiredFieldsDto implements PurchaseRequired {
	@ApiProperty({ enum: InventoryStatus })
	@IsNotEmpty()
	@IsEnum(InventoryStatus)
	status: $Enums.InventoryStatus

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	providerId: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	storehouseId: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	storekeeperId: string
}

export class PurchaseOptionalDto extends DefaultOptionalFieldsDto implements PurchaseOptional {
	@ApiPropertyOptional({ enum: InventoryStatus })
	@IsOptional()
	@IsEnum(InventoryStatus)
	status?: $Enums.InventoryStatus

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	providerId?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	storehouseId?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	storekeeperId?: string
}
