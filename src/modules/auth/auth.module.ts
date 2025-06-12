import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PrismaModule } from '../shared/prisma'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthRepository } from './auth.repository'
import { JsonWebTokenService } from './jwt.service'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, JwtModule.register({ global: true }), UserModule],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, JsonWebTokenService],
	exports: [],
})
export class AuthModule {}
