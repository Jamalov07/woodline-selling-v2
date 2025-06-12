import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { RoleRepository } from './role.repository'

@Module({
	imports: [PrismaModule],
	controllers: [RoleController],
	providers: [RoleService, RoleRepository],
	exports: [RoleService, RoleRepository],
})
export class RoleModule {}
