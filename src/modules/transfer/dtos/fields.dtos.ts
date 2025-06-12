import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { TransferOptional, TransferRequired } from '../interfaces'
import { $Enums, InventoryStatus } from '@prisma/client'

export class TransferRequiredDto extends DefaultRequiredFieldsDto implements TransferRequired {
	@ApiProperty({ enum: InventoryStatus })
	@IsNotEmpty()
	@IsEnum(InventoryStatus)
	status: $Enums.InventoryStatus

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	fromStorehouseId: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	toStorehouseId: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	fromStorekeeperId: string

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	toStorekeeperId: string
}

export class TransferOptionalDto extends DefaultOptionalFieldsDto implements TransferOptional {
	@ApiPropertyOptional({ enum: InventoryStatus })
	@IsOptional()
	@IsEnum(InventoryStatus)
	status?: $Enums.InventoryStatus

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	fromStorehouseId?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	toStorehouseId?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	fromStorekeeperId?: string

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	toStorekeeperId?: string
}
