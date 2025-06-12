import { Body, Controller, Get, Patch, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { AuthOptions } from '@common'
import { RoleFindManyRequestDto, RoleFindOneRequestDto, RoleFindManyResponseDto, RoleFindOneResponseDto, RoleModifyResponseDto, RoleUpdateOneRequestDto } from './dtos'

@ApiTags('Role')
@Controller('role')
export class RoleController {
	private readonly roleService: RoleService

	constructor(RoleService: RoleService) {
		this.roleService = RoleService
	}

	@Get('many')
	@ApiOkResponse({ type: RoleFindManyResponseDto })
	@ApiOperation({ summary: 'get all roles' })
	@AuthOptions(false, false)
	async findMany(@Query() query: RoleFindManyRequestDto): Promise<RoleFindManyResponseDto> {
		return this.roleService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one role' })
	@ApiOkResponse({ type: RoleFindOneResponseDto })
	async getOne(@Query() query: RoleFindOneRequestDto): Promise<RoleFindOneResponseDto> {
		return this.roleService.findOne(query)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one role' })
	@ApiOkResponse({ type: RoleModifyResponseDto })
	async updateOne(@Query() query: RoleFindOneRequestDto, @Body() body: RoleUpdateOneRequestDto): Promise<RoleModifyResponseDto> {
		return this.roleService.updateOne(query, body)
	}
}
