import { FurnitureType, Model, Order, OrderProduct, Payment, Product, SP, SPS, User } from '@prisma/client'

export declare interface OrderFullDetail extends Partial<Order> {
	seller: Partial<User>
	client: Partial<User>
	payments: Partial<Payment>[]
	products: OrderProductDetail[]
}

export declare interface OrderProductDetail extends Partial<OrderProduct> {
	sps: OrderProductSPSDetail
}

export declare interface OrderProductSPSDetail extends Partial<SPS> {
	sp: OrderProductSPDetail
}

export declare interface OrderProductSPDetail extends Partial<SP> {
	product: OrderProductProductDetail
}

export declare interface OrderProductProductDetail extends Partial<Product> {
	model: OrderProductModelDetail
}

export declare interface OrderProductModelDetail extends Partial<Model> {
	furnitureType: Partial<FurnitureType>
}
