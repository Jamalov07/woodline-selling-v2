import { PickType, IntersectionType, ApiPropertyOptional } from '@nestjs/swagger'
import { UserCreateOneRequest, UserDeleteOneRequest, UserFindManyRequest, UserFindOneRequest, UserUpdateOneRequest } from '../interfaces'
import { PaginationRequestDto, RequestOtherFieldsDto } from '@common'
import { UserOptionalDto, UserRequiredDto } from './fields.dtos'
import { IsOptional, IsUUID } from 'class-validator'

export class UserFindManyRequestDto
	extends IntersectionType(PickType(UserOptionalDto, ['fullname', 'phone']), PaginationRequestDto, PickType(RequestOtherFieldsDto, ['search', 'roleNames']))
	implements UserFindManyRequest {}

export class UserFindOneRequestDto extends IntersectionType(PickType(UserRequiredDto, ['id'])) implements UserFindOneRequest {}

export class UserCreateOneRequestDto
	extends IntersectionType(
		PickType(UserRequiredDto, ['fullname', 'phone', 'password']),
		PickType(UserOptionalDto, ['source']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'rolesToConnect']),
	)
	implements UserCreateOneRequest
{
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	storehouseId?: string
}

export class UserUpdateOneRequestDto
	extends IntersectionType(
		PickType(UserOptionalDto, ['deletedAt', 'fullname', 'password', 'phone', 'token']),
		PickType(RequestOtherFieldsDto, ['actionsToConnect', 'actionsToDisconnect', 'rolesToConnect', 'rolesToDisconnect']),
	)
	implements UserUpdateOneRequest
{
	@ApiPropertyOptional({ type: String })
	@IsOptional()
	@IsUUID('4')
	storehouseId?: string
}

export class UserDeleteOneRequestDto extends IntersectionType(PickType(UserRequiredDto, ['id'])) implements UserDeleteOneRequest {}
