import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ProviderStorehouseOptional, ProviderStorehouseRequired } from '../interfaces'

export class ProviderStorehouseRequiredDto implements ProviderStorehouseRequired {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	providerId: string

	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsUUID('4')
	storehouseId: string
}

export class ProviderStorehouseOptionalDto implements ProviderStorehouseOptional {
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	providerId?: string

	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	storehouseId?: string
}
