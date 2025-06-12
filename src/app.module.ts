import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import {
	ActionModule,
	AuthModule,
	CartModule,
	FurnitureTypeModule,
	ModelModule,
	OrderModule,
	OrderProductModule,
	PaymentModule,
	ProductModule,
	ProductMVModule,
	ProductStatusMVModule,
	ProviderStorehouseModule,
	PublicIdModule,
	PurchaseModule,
	RoleModule,
	SellingModule,
	SharedModule,
	SPSBookingModule,
	SPSModule,
	StorehouseModule,
	StorehouseProductModule,
	TransferModule,
	UserModule,
} from '@module'
import { appConfig, databaseConfig, jwtConfig } from '@config'
import { AuthGuard, CheckPermissionGuard } from '@common'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, databaseConfig, jwtConfig],
		}),
		SharedModule,
		AuthModule,
		UserModule,
		ProviderStorehouseModule,
		RoleModule,
		ActionModule,
		FurnitureTypeModule,
		ModelModule,
		StorehouseModule,
		StorehouseProductModule,
		SPSModule,
		SPSBookingModule,
		PublicIdModule,
		PaymentModule,
		ProductModule,
		CartModule,
		OrderProductModule,
		OrderModule,
		ProductMVModule,
		ProductStatusMVModule,
		SellingModule,
		PurchaseModule,
		TransferModule,
	],
	controllers: [],
	providers: [AuthGuard, CheckPermissionGuard],
})
export class AppModule {}
