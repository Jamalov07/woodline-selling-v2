import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { CartController } from './cart.controller'
import { CartService } from './cart.service'
import { CartRepository } from './cart.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [CartController],
	providers: [CartService, CartRepository],
	exports: [CartService, CartRepository],
})
export class CartModule {}
