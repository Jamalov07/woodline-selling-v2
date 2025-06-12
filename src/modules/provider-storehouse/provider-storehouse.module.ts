import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { ProviderStorehouseController } from './provider-storehouse.controller'
import { ProviderStorehouseService } from './provider-storehouse.service'
import { ProviderStorehouseRepository } from './provider-storehouse.repository'

@Module({
	imports: [PrismaModule],
	controllers: [ProviderStorehouseController],
	providers: [ProviderStorehouseService, ProviderStorehouseRepository],
	exports: [ProviderStorehouseService, ProviderStorehouseRepository],
})
export class ProviderStorehouseModule {}
