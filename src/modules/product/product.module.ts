import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { ProductController } from './product.controller'
import { ProductService } from './product.service'
import { ProductRepository } from './product.repository'

@Module({
	imports: [PrismaModule],
	controllers: [ProductController],
	providers: [ProductService, ProductRepository],
	exports: [ProductService, ProductRepository],
})
export class ProductModule {}
