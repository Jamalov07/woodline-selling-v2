import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import {
	UserFindManyRequestDto,
	UserFindOneRequestDto,
	UserFindManyResponseDto,
	UserFindOneResponseDto,
	UserModifyResponseDto,
	UserUpdateOneRequestDto,
	UserDeleteOneRequestDto,
	UserCreateOneRequestDto,
} from './dtos'

@ApiTags('User')
@Controller('user')
export class UserController {
	private readonly userService: UserService

	constructor(userService: UserService) {
		this.userService = userService
	}

	@Get('many')
	@ApiOkResponse({ type: UserFindManyResponseDto })
	@ApiOperation({ summary: 'get all users' })
	async findMany(@Query() query: UserFindManyRequestDto): Promise<UserFindManyResponseDto> {
		return this.userService.findMany(query)
	}

	@Get('one')
	@ApiOperation({ summary: 'find one user' })
	@ApiOkResponse({ type: UserFindOneResponseDto })
	async findOne(@Query() query: UserFindOneRequestDto): Promise<UserFindOneResponseDto> {
		return this.userService.findOne(query)
	}

	@Post('one')
	@ApiOperation({ summary: 'create one user' })
	@ApiOkResponse({ type: UserModifyResponseDto })
	async createOne(@Body() body: UserCreateOneRequestDto): Promise<UserModifyResponseDto> {
		return this.userService.createOne(body)
	}

	@Patch('one')
	@ApiOperation({ summary: 'update one user' })
	@ApiOkResponse({ type: UserModifyResponseDto })
	async updateOne(@Query() query: UserFindOneRequestDto, @Body() body: UserUpdateOneRequestDto): Promise<UserModifyResponseDto> {
		return this.userService.updateOne(query, body)
	}

	@Delete('one')
	@ApiOperation({ summary: 'delete one user' })
	@ApiOkResponse({ type: UserModifyResponseDto })
	async deleteOne(@Query() query: UserDeleteOneRequestDto): Promise<UserModifyResponseDto> {
		return this.userService.deleteOne(query)
	}
}
