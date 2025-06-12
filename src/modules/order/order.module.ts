import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { GoogleSheetModule } from '../shared/google-sheet'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'
import { OrderRepository } from './order.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, GoogleSheetModule, UserModule],
	controllers: [OrderController],
	providers: [OrderService, OrderRepository],
	exports: [OrderService, OrderRepository],
})
export class OrderModule {}
