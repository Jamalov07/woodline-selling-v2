import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { SPSBookingFindManyData, SPSBookingFindManyResponse, SPSBookingFindOneData, SPSBookingFindOneResponse, SPSBookingModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { SPSBookingRequiredDto } from './fields.dtos'

export class SPSBookingFindOneDataDto extends PickType(SPSBookingRequiredDto, ['id', 'createdAt']) implements SPSBookingFindOneData {}

export class SPSBookingFindManyDataDto extends PaginationResponseDto implements SPSBookingFindManyData {
	@ApiProperty({ type: SPSBookingFindOneDataDto, isArray: true })
	data: SPSBookingFindOneData[]
}

export class SPSBookingFindManyResponseDto extends GlobalResponseDto implements SPSBookingFindManyResponse {
	@ApiProperty({ type: SPSBookingFindManyDataDto })
	data: SPSBookingFindManyData
}

export class SPSBookingFindOneResponseDto extends GlobalResponseDto implements SPSBookingFindOneResponse {
	@ApiProperty({ type: SPSBookingFindOneDataDto })
	data: SPSBookingFindOneData
}

export class SPSBookingModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements SPSBookingModifyResposne {}
