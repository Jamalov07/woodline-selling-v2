import { GlobalResponse } from '@common'
import { UserOptional } from '../../user'

export declare interface Tokens {
	accessToken: string
	refreshToken: string
}

export declare interface UserSignInData {
	user: UserOptional
	tokens: Tokens
}

export declare interface UserSignInResponse extends GlobalResponse {
	data: UserSignInData
}
