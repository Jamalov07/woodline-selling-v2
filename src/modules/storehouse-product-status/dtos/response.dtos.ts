import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { SPSFindManyData, SPSFindManyResponse, SPSFindOneData, SPSFindOneResponse, SPSModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { SPSRequiredDto } from './fields.dtos'

export class SPSFindOneDataDto extends PickType(SPSRequiredDto, ['id', 'createdAt']) implements SPSFindOneData {}

export class SPSFindManyDataDto extends PaginationResponseDto implements SPSFindManyData {
	@ApiProperty({ type: SPSFindOneDataDto, isArray: true })
	data: SPSFindOneData[]
}

export class SPSFindManyResponseDto extends GlobalResponseDto implements SPSFindManyResponse {
	@ApiProperty({ type: SPSFindManyDataDto })
	data: SPSFindManyData
}

export class SPSFindOneResponseDto extends GlobalResponseDto implements SPSFindOneResponse {
	@ApiProperty({ type: SPSFindOneDataDto })
	data: SPSFindOneData
}

export class SPSModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements SPSModifyResposne {}
