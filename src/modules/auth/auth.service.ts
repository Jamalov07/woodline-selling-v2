import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { createResponse } from '@common'
import { AuthGetUserProfile, AuthGetValidTokensRequest, AuthSignOutRequest, UserSignInRequest } from './interfaces'
import { JsonWebTokenService } from './jwt.service'
import { AuthRepository } from './auth.repository'
import { UserRepository } from '../user'

@Injectable()
export class AuthService {
	private readonly authRepository: AuthRepository
	private readonly jwtService: JsonWebTokenService
	private readonly userRepository: UserRepository

	constructor(authRepository: AuthRepository, jwtService: JsonWebTokenService, userRepository: UserRepository) {
		this.authRepository = authRepository
		this.userRepository = userRepository
		this.jwtService = jwtService
	}

	async signIn(body: UserSignInRequest) {
		const user = await this.authRepository.findOneUser(body)

		if (!user) {
			throw new UnauthorizedException('user unauthorized')
		}

		if (user.deletedAt) {
			throw new BadRequestException('user was deleted')
		}

		const isCorrect = await bcrypt.compare(body.password, user.password)
		if (!isCorrect) {
			throw new UnauthorizedException('wrong password')
		}
		delete user.password

		const tokens = await this.jwtService.getTokens({ id: user.id })
		await this.userRepository.updateOne({ id: user.id }, { token: tokens.refreshToken })

		return createResponse({ data: { user: { ...user }, tokens: tokens }, success: { messages: ['sign in success'] } })
	}

	async signOut(body: AuthSignOutRequest) {
		const user = await this.userRepository.getOne({ id: body.user?.id, isDeleted: false })

		if (!user.token) {
			return createResponse({ data: null, success: { messages: ['sign out success'] }, warning: { is: true, messages: ['already sign out'] } })
		}
		await this.userRepository.updateOne({ id: user.id }, { token: '' })

		return createResponse({ data: null, success: { messages: ['sign out success'] } })
	}

	async getValidTokens(body: AuthGetValidTokensRequest) {
		const user = await this.userRepository.getOne({ id: body.user.id, token: body.user.token, isDeleted: false })

		if (!user) {
			throw new UnauthorizedException('user not found')
		}

		const tokens = await this.jwtService.getTokens({ id: body.user.id })
		await this.userRepository.updateOne({ id: user.id }, { token: tokens.refreshToken })
		return createResponse({ data: { user: user, tokens: tokens }, success: { messages: ['refresh token success'] } })
	}

	async getUserProfile(body: AuthGetUserProfile) {
		const user = await this.userRepository.getOne({ id: body.user.id, token: body.user.token, isDeleted: false })

		if (!user) {
			throw new UnauthorizedException('user not found')
		}

		return createResponse({ data: user, success: { messages: ['user get profile success'] } })
	}
}
