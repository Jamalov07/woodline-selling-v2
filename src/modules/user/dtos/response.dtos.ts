import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger'
import { UserFindManyData, UserFindManyResponse, UserFindOneData, UserFindOneResponse, UserModifyResposne } from '../interfaces'
import { GlobalModifyResponseDto, GlobalResponseDto, PaginationResponseDto } from '@common'
import { UserRequiredDto } from './fields.dtos'

export class UserFindOneDataDto extends PickType(UserRequiredDto, ['id', 'fullname', 'phone', 'createdAt']) implements UserFindOneData {
	@ApiProperty({ type: String, isArray: true })
	actionIds?: string[]
}

export class UserFindManyDataDto extends PaginationResponseDto implements UserFindManyData {
	@ApiProperty({ type: UserFindOneDataDto, isArray: true })
	data: UserFindOneData[]
}

export class UserFindManyResponseDto extends GlobalResponseDto implements UserFindManyResponse {
	@ApiProperty({ type: UserFindManyDataDto })
	data: UserFindManyData
}

export class UserFindOneResponseDto extends GlobalResponseDto implements UserFindOneResponse {
	@ApiProperty({ type: UserFindOneDataDto })
	data: UserFindOneData
}

export class UserModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) implements UserModifyResposne {}
