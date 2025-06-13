import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	OrderCreateOneRequest,
	OrderCreateOneWithPaymentProductRequest,
	OrderDeleteOneRequest,
	OrderFindManyRequest,
	OrderFindOneRequest,
	OrderGetManyRequest,
	OrderGetOneRequest,
	OrderUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter, getMostFrequentStorehouseId } from '../../common'
import { OrderProductStatus, OrderProductType, ProductMVType, SPStatus } from '@prisma/client'

@Injectable()
export class OrderRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: OrderFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orders = await this.prisma.order.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: { contains: query.deliveryAddress, mode: 'insensitive' },
				clientId: query.clientId,
				sellerId: query.sellerId,
				OR: [
					{ client: { phone: { contains: query.search, mode: 'insensitive' } } },
					{ client: { fullname: { contains: query.search, mode: 'insensitive' } } },
					{ products: { some: { sps: { sp: { product: { publicId: { contains: query.search, mode: 'insensitive' } } } } } } },
				],
			},
			select: {
				id: true,
				createdAt: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				clientPStatus: true,
				seller: true,
				status: true,
				payments: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						exchangeRate: true,
						fromCurrency: true,
						method: true,
						sum: true,
						toCurrency: true,
						totalSum: true,
					},
				},
				products: {
					select: {
						type: true,
						id: true,
						createdAt: true,
						description: true,
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						totalSum: true,
						status: true,
						sps: {
							select: {
								sp: {
									select: {
										product: {
											select: {
												direction: true,
												model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } } } },
												publicId: true,
												tissue: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
			...paginationOptions,
		})

		return orders
	}

	async findOne(query: OrderFindOneRequest) {
		const seller = await this.prisma.order.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				createdAt: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				clientPStatus: true,
				seller: true,
				status: true,
				payments: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						exchangeRate: true,
						fromCurrency: true,
						method: true,
						sum: true,
						toCurrency: true,
						totalSum: true,
					},
				},
				products: {
					select: {
						type: true,
						id: true,
						createdAt: true,
						description: true,
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						totalSum: true,
						status: true,
						sps: {
							select: {
								sp: {
									select: {
										product: {
											select: {
												direction: true,
												model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } } } },
												publicId: true,
												tissue: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		})

		return seller
	}

	async countFindMany(query: OrderFindManyRequest) {
		const orderCount = await this.prisma.order.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: { contains: query.deliveryAddress, mode: 'insensitive' },
				clientId: query.clientId,
				sellerId: query.sellerId,
				OR: [
					{ client: { phone: { contains: query.search, mode: 'insensitive' } } },
					{ client: { fullname: { contains: query.search, mode: 'insensitive' } } },
					{ products: { some: { sps: { sp: { product: { publicId: { contains: query.search, mode: 'insensitive' } } } } } } },
				],
			},
		})

		return orderCount
	}

	async getMany(query: OrderGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orders = await this.prisma.order.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: query.deliveryAddress,
				clientId: query.clientId,
				sellerId: query.sellerId,
			},
			...paginationOptions,
		})

		return orders
	}

	async getOne(query: OrderGetOneRequest) {
		const seller = await this.prisma.order.findFirst({
			where: {
				id: query.id,
				deliveryAddress: query.deliveryAddress,
			},
		})

		return seller
	}

	async countGetMany(query: OrderGetManyRequest) {
		const orderCount = await this.prisma.order.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				deliveryAddress: query.deliveryAddress,
				clientId: query.clientId,
				sellerId: query.sellerId,
			},
		})

		return orderCount
	}

	async createOne(body: OrderCreateOneRequest) {
		const order = await this.prisma.order.create({
			data: {
				deliveryAddress: body.deliveryAddress,
				clientId: body.clientId,
				deliveryDate: new Date(body.deliveryDate),
				sellerId: body.sellerId,
				clientPStatus: body.clientPStatus,
			},
			select: { id: true, createdAt: true, client: true, deliveryAddress: true, deliveryDate: true, clientPStatus: true, seller: true, status: true },
		})
		return order
	}

	async createOneWithAll(body: OrderCreateOneWithPaymentProductRequest) {
		const carts = await this.prisma.cart.findMany({
			where: { sellerId: body.sellerId },
			select: {
				description: true,
				id: true,
				price: true,
				priceWithSale: true,
				sale: true,
				totalSum: true,
				quantity: true,
				seller: true,
				type: true,
				spsId: true,
				sps: {
					select: {
						quantity: true,
						status: true,
						sp: {
							select: {
								storehouseId: true,
								productId: true,
							},
						},
					},
				},
			},
		})

		const order = await this.prisma.order.create({
			data: {
				deliveryAddress: body.deliveryAddress,
				clientId: body.clientId,
				deliveryDate: new Date(body.deliveryDate),
				sellerId: body.sellerId,
				clientPStatus: body.clientPStatus,
				payments: {
					createMany: {
						skipDuplicates: false,
						data: body.payments.map((p) => {
							return {
								description: p.description,
								exchangeRate: p.exchangeRate,
								fromCurrency: p.fromCurrency,
								method: p.method,
								sum: p.sum,
								totalSum: p.totalSum,
							}
						}),
					},
				},
				products: {
					createMany: {
						skipDuplicates: false,
						data: carts.map((c) => {
							return {
								type: c.type,
								sellerId: body.sellerId,
								price: c.price,
								priceWithSale: c.priceWithSale,
								quantity: c.quantity,
								totalSum: c.totalSum,
								sale: c.sale,
								description: c.description,
								status: c.type === OrderProductType.standart ? OrderProductStatus.sold : OrderProductStatus.new,
								spsId: c.spsId,
							}
						}),
					},
				},
			},
			select: {
				id: true,
				createdAt: true,
				client: true,
				deliveryAddress: true,
				deliveryDate: true,
				clientPStatus: true,
				seller: true,
				status: true,
				payments: {
					select: {
						id: true,
						createdAt: true,
						description: true,
						exchangeRate: true,
						fromCurrency: true,
						method: true,
						sum: true,
						toCurrency: true,
						totalSum: true,
					},
				},
				products: {
					select: {
						id: true,
						type: true,
						createdAt: true,
						description: true,
						price: true,
						priceWithSale: true,
						quantity: true,
						sale: true,
						totalSum: true,
						status: true,
						sps: {
							select: {
								sp: {
									select: {
										product: {
											select: {
												id: true,
												direction: true,
												model: { select: { id: true, createdAt: true, name: true, furnitureType: { select: { name: true, id: true, createdAt: true } } } },
												publicId: true,
												tissue: true,
											},
										},
										storehouseId: true,
									},
								},
								status: true,
							},
						},
					},
				},
			},
		})

		const standartPros = order.products.filter((pr) => pr.type === OrderProductType.standart)

		await this.prisma.selling.createMany({
			skipDuplicates: false,
			data: standartPros.map((prod) => ({ storehouseId: prod.sps.sp.storehouseId, orderProductId: prod.id })),
		})

		await this.prisma.cart.deleteMany({ where: { sellerId: body.sellerId } })

		return order
	}

	async updateOne(query: OrderGetOneRequest, body: OrderUpdateOneRequest) {
		const order = await this.prisma.order.update({
			where: { id: query.id },
			data: {
				deliveryAddress: body.deliveryAddress,
				clientId: body.clientId,
				sellerId: body.sellerId,
				deliveryDate: body.deliveryDate,
				status: body.status,
			},
		})

		return order
	}

	async deleteOne(query: OrderDeleteOneRequest) {
		const order = await this.prisma.order.delete({
			where: { id: query.id },
		})
		return order
	}
}
