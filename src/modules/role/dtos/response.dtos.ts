import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { RoleFindManyData, RoleFindManyResponse, RoleFindOneData, RoleFindOneResponse, RoleModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { RoleRequiredDto } from './fields.dtos'

export class RoleFindOneDataDto extends PickType(RoleRequiredDto, ['name']) implements RoleFindOneData {}

export class RoleFindManyDataDto extends PaginationResponseDto implements RoleFindManyData {
	@ApiProperty({ type: RoleFindOneDataDto, isArray: true })
	data: RoleFindOneData[]
}

export class RoleFindManyResponseDto extends GlobalResponseDto implements RoleFindManyResponse {
	@ApiProperty({ type: RoleFindManyDataDto })
	data: RoleFindManyData
}

export class RoleFindOneResponseDto extends GlobalResponseDto implements RoleFindOneResponse {
	@ApiProperty({ type: RoleFindOneDataDto })
	data: RoleFindOneData
}

export class RoleModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements RoleModifyResposne {}
