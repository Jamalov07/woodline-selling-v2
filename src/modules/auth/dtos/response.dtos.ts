import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { Tokens, UserSignInData, UserSignInResponse } from '../interfaces'
import { UserOptional, UserOptionalDto } from '../../user'
import { GlobalModifyResponseDto, GlobalResponseDto } from '@common'

export class TokensDto implements Tokens {
	@ApiProperty({ type: String })
	accessToken: string

	@ApiProperty({ type: String })
	refreshToken: string
}

export class UserSignInDataDto implements UserSignInData {
	@ApiProperty({ type: UserOptionalDto })
	user: UserOptional

	@ApiProperty({ type: TokensDto })
	tokens: Tokens
}

export class UserSignInResponseDto extends GlobalResponseDto implements UserSignInResponse {
	@ApiProperty({ type: UserSignInDataDto })
	data: UserSignInData
}

export class AuthModifyResponseDto extends IntersectionType(GlobalResponseDto, GlobalModifyResponseDto) {}
