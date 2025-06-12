import { Module } from '@nestjs/common'
import { PrismaModule } from '../shared/prisma'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'
import { PaymentRepository } from './payment.repository'
import { UserModule } from '../user'

@Module({
	imports: [PrismaModule, UserModule],
	controllers: [PaymentController],
	providers: [PaymentService, PaymentRepository],
	exports: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
