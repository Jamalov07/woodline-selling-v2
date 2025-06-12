import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { OrderProductController } from './order-product.controller'
import { OrderProductService } from './order-product.service'
import { OrderProductRepository } from './order-product.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [OrderProductController],
	providers: [OrderProductService, OrderProductRepository],
	exports: [OrderProductService, OrderProductRepository],
})
export class OrderProductModule {}
