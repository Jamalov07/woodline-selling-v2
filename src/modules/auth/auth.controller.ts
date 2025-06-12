import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthModifyResponseDto, UserSignInRequestDto, UserSignInResponseDto } from './dtos'
import { CRequest, AuthOptions, RefreshTokenInterceptor } from '@common'
import { UserFindOneResponseDto } from '../user'

@Controller('auth')
export class AuthController {
	private readonly authService: AuthService
	constructor(authService: AuthService) {
		this.authService = authService
	}

	@Get('profile')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'user profile' })
	@ApiOkResponse({ type: UserFindOneResponseDto })
	async getUserProfile(@Req() request: CRequest): Promise<UserFindOneResponseDto> {
		return this.authService.getUserProfile({ user: request.user })
	}

	@Post('sign-in')
	@ApiOperation({ summary: 'sign in user' })
	@ApiOkResponse({ type: UserSignInResponseDto })
	async signIn(@Body() body: UserSignInRequestDto): Promise<UserSignInResponseDto> {
		return this.authService.signIn(body)
	}

	@Post('sign-out')
	@AuthOptions(true, true)
	@ApiOperation({ summary: 'sign out user' })
	@ApiOkResponse({ type: AuthModifyResponseDto })
	async signOut(@Req() request: CRequest): Promise<AuthModifyResponseDto> {
		return this.authService.signOut({ user: request.user })
	}

	@Post('refresh-token')
	@ApiOperation({ summary: 'refresh token' })
	@ApiOkResponse({ type: UserSignInResponseDto })
	@UseInterceptors(RefreshTokenInterceptor)
	async getValidTokensWithRefresh(@Req() request: CRequest) {
		return this.authService.getValidTokens({ user: request.user })
	}
}
