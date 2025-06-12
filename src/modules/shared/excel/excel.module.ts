import { Module } from '@nestjs/common'
import { ExcelService } from './excel.service'
import { PrismaModule } from '../prisma'

@Module({
	imports: [PrismaModule],
	providers: [ExcelService],
	exports: [ExcelService],
})
export class ExcelModule {}
