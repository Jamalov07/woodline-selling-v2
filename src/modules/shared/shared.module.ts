import { Module } from '@nestjs/common'
import { GoogleSheetModule } from './google-sheet'
import { ExcelModule } from './excel'
import { PrismaModule } from './prisma'
import { CronModule } from './cron'

@Module({
	imports: [GoogleSheetModule, ExcelModule, PrismaModule, CronModule],
	exports: [PrismaModule],
})
export class SharedModule {}
