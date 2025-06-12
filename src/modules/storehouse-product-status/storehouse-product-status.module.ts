import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { SPSController } from './storehouse-product-status.controller'
import { SPSService } from './storehouse-product-status.service'
import { SPSRepository } from './storehouse-product-status.repository'

@Module({
	imports: [PrismaModule],
	controllers: [SPSController],
	providers: [SPSService, SPSRepository],
	exports: [SPSService, SPSRepository],
})
export class SPSModule {}
