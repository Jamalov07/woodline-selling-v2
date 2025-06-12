import { Module } from '@nestjs/common'
import { ActionController } from './action.controller'
import { ActionService } from './action.service'
import { ActionRepository } from './action.repository'
import { PrismaModule } from '../shared/prisma'
import { ActionSyncService } from './action-sync.service'
import { DiscoveryModule, Reflector } from '@nestjs/core'

@Module({
	imports: [PrismaModule, DiscoveryModule],
	controllers: [ActionController],
	providers: [ActionService, ActionRepository, ActionSyncService, Reflector],
	exports: [],
})
export class ActionModule {}
