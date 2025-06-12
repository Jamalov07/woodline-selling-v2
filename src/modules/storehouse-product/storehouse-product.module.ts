import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { StorehouseProductController } from './storehouse-product.controller'
import { StorehouseProductService } from './storehouse-product.service'
import { StorehouseProductRepository } from './storehouse-product.repository'

@Module({
	imports: [PrismaModule],
	controllers: [StorehouseProductController],
	providers: [StorehouseProductService, StorehouseProductRepository],
	exports: [StorehouseProductService, StorehouseProductRepository],
})
export class StorehouseProductModule {}
