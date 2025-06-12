import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { ProductStatusMVController } from './product-status-mv.controller'
import { ProductStatusMVService } from './product-status-mv.service'
import { ProductStatusMVRepository } from './product-status-mv.repository'

@Module({
	imports: [PrismaModule],
	controllers: [ProductStatusMVController],
	providers: [ProductStatusMVService, ProductStatusMVRepository],
	exports: [ProductStatusMVService, ProductStatusMVRepository],
})
export class ProductStatusMVModule {}
