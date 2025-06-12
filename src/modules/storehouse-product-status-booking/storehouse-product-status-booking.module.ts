import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { SPSBookingController } from './storehouse-product-status-boking.controller'
import { SPSBookingService } from './storehouse-product-status-booking.service'
import { SPSBookingRepository } from './storehouse-product-status-booking.repository'

@Module({
	imports: [PrismaModule],
	controllers: [SPSBookingController],
	providers: [SPSBookingService, SPSBookingRepository],
	exports: [SPSBookingService, SPSBookingRepository],
})
export class SPSBookingModule {}
