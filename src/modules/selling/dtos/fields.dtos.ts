import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DefaultOptionalFieldsDto, DefaultRequiredFieldsDto } from '@common'
import { SellingOptional, SellingRequired } from '../interfaces'
import { $Enums, InventoryStatus } from '@prisma/client'

export class SellingRequiredDto extends DefaultRequiredFieldsDto implements SellingRequired {
	@ApiProperty({ enum: InventoryStatus })
	@IsNotEmpty()
	@IsEnum(InventoryStatus)
	status: $Enums.InventoryStatus

	@ApiProperty({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsNotEmpty()
	@IsString()
	@IsUUID('4')
	orderId: string

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

export class SellingOptionalDto extends DefaultOptionalFieldsDto implements SellingOptional {
	@ApiPropertyOptional({ enum: InventoryStatus })
	@IsOptional()
	@IsEnum(InventoryStatus)
	status?: $Enums.InventoryStatus

	@ApiPropertyOptional({ type: String, example: '00097072-f510-4ded-a18f-976d7fa2e024' })
	@IsOptional()
	@IsString()
	@IsUUID('4')
	orderId?: string

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
