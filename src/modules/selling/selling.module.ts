import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { SellingController } from './selling.controller'
import { SellingService } from './selling.service'
import { SellingRepository } from './selling.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [SellingController],
	providers: [SellingService, SellingRepository],
	exports: [SellingService, SellingRepository],
})
export class SellingModule {}
