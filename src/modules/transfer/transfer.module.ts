import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { TransferController } from './transfer.controller'
import { TransferService } from './transfer.service'
import { TransferRepository } from './transfer.repository'

@Module({
	imports: [PrismaModule],
	controllers: [TransferController],
	providers: [TransferService, TransferRepository],
	exports: [TransferService, TransferRepository],
})
export class TransferModule {}
