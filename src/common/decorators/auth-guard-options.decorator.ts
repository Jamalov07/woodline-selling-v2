import { SetMetadata } from '@nestjs/common'

export const AuthOptions = (isAuthRequired: boolean = false, isUserRequired: boolean = false) => SetMetadata('authOptions', { isAuthRequired, isUserRequired })
