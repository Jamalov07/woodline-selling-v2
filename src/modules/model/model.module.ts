import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { ModelController } from './model.controller'
import { ModelService } from './model.service'
import { ModelRepository } from './model.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [ModelController],
	providers: [ModelService, ModelRepository],
	exports: [ModelService, ModelRepository],
})
export class ModelModule {}
