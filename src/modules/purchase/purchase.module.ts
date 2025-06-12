import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { PurchaseController } from './purchase.controller'
import { PurchaseService } from './purchase.service'
import { PurchaseRepository } from './purchase.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [PurchaseController],
	providers: [PurchaseService, PurchaseRepository],
	exports: [PurchaseService, PurchaseRepository],
})
export class PurchaseModule {}
