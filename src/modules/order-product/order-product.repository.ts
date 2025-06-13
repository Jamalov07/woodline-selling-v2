import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	OrderProductCreateOneRequest,
	OrderProductDeleteOneRequest,
	OrderProductFindManyRequest,
	OrderProductFindOneRequest,
	OrderProductGetManyRequest,
	OrderProductGetOneRequest,
	OrderProductUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { OrderProductStatus, OrderProductType, ProductMVStatus, ProductMVType, ProductType, SPStatus } from '@prisma/client'

@Injectable()
export class OrderProductRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: OrderProductFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orderProducts = await this.prisma.orderProduct.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
			select: {
				id: true,
				type: true,
				status: true,
				createdAt: true,
				description: true,
				price: true,
				priceWithSale: true,
				sale: true,
				quantity: true,
				totalSum: true,
				seller: true,
				sps: {
					select: {
						status: true,
						sp: {
							select: {
								id: true,
								product: {
									select: {
										id: true,
										description: true,
										direction: true,
										tissue: true,
										quantity: true,
										publicId: true,
										model: { select: { id: true, name: true, furnitureType: { select: { id: true, name: true, createdAt: true } } } },
									},
								},
								storehouse: { select: { name: true, id: true, createdAt: true } },
							},
						},
					},
				},
			},
			...paginationOptions,
		})

		return orderProducts
	}

	async findOne(query: OrderProductFindOneRequest) {
		const seller = await this.prisma.orderProduct.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				type: true,
				status: true,
				createdAt: true,
				description: true,
				price: true,
				priceWithSale: true,
				sale: true,
				quantity: true,
				totalSum: true,
				seller: true,
				sps: {
					select: {
						status: true,
						sp: {
							select: {
								id: true,
								product: {
									select: {
										id: true,
										description: true,
										direction: true,
										tissue: true,
										quantity: true,
										publicId: true,
										model: { select: { id: true, name: true, furnitureType: { select: { id: true, name: true, createdAt: true } } } },
									},
								},
								storehouse: { select: { name: true, id: true, createdAt: true } },
							},
						},
					},
				},
			},
		})

		return seller
	}

	async countFindMany(query: OrderProductFindManyRequest) {
		const orderProductCount = await this.prisma.orderProduct.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
		})

		return orderProductCount
	}

	async getMany(query: OrderProductGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const orderProducts = await this.prisma.orderProduct.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
			...paginationOptions,
		})

		return orderProducts
	}

	async getOne(query: OrderProductGetOneRequest) {
		const seller = await this.prisma.orderProduct.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				description: true,
				price: true,
				priceWithSale: true,
				quantity: true,
				sale: true,
				status: true,
				type: true,
				totalSum: true,
				orderId: true,
				spsId: true,
				sps: { select: { quantity: true, status: true, sp: { select: { productId: true, statuses: true, storehouseId: true } } } },
			},
		})

		return seller
	}

	async countGetMany(query: OrderProductGetManyRequest) {
		const orderProductCount = await this.prisma.orderProduct.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
		})

		return orderProductCount
	}

	async createOne(body: OrderProductCreateOneRequest) {
		let product: { SPs: { statuses: { id: string }[] }[] }

		if (!body.spsId) {
			const model = await this.prisma.model.findFirst({
				where: { id: body.productDetail.modelId },
				select: { provider: { select: { storehouse: { select: { storehouseId: true } } } } },
			})

			product = await this.prisma.product.create({
				data: {
					publicId: body.productDetail.publicId,
					type: ProductType.nonstandart,
					direction: body.productDetail.direction,
					tissue: body.productDetail.tissue,
					modelId: body.productDetail.modelId,
					quantity: body.productDetail.quantity,
					SPs: { create: { storehouseId: model.provider.storehouse.storehouseId, statuses: { create: { status: SPStatus.pending } } } },
				},
				select: { SPs: { select: { statuses: { select: { id: true } } } } },
			})
		}

		if (!product?.SPs[0].statuses[0].id) {
			return null
		}

		const orderProduct = await this.prisma.orderProduct.create({
			data: {
				type: body.spsId ? OrderProductType.standart : OrderProductType.nonstandart,
				sellerId: body.sellerId,
				spsId: body.spsId ? body.spsId : product.SPs[0].statuses[0].id,
				quantity: body.quantity,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
				orderId: body.orderId,
			},
		})
		return orderProduct
	}

	async updateOne(query: OrderProductGetOneRequest, body: OrderProductUpdateOneRequest) {
		const orP = await this.getOne({ id: query.id })

		if (body.productDetail) {
			if (orP.type === OrderProductType.nonstandart) {
				const sps = await this.prisma.sPS.findFirst({
					where: { id: orP.spsId },
					select: { sp: { select: { productId: true } } },
				})

				await this.prisma.product.update({
					where: { id: sps.sp.productId },
					data: {
						direction: body.productDetail.direction,
						tissue: body.productDetail.tissue,
						modelId: body.productDetail.modelId,
						quantity: body.productDetail.quantity,
					},
				})
			}
		}

		if (body.status === OrderProductStatus.sold) {
			if (orP.type === OrderProductType.nonstandart) {
				await this.prisma.sPS.update({ where: { id: orP.spsId }, data: { status: SPStatus.active } })
			}
			await this.prisma.selling.create({
				data: { storehouseId: orP.sps.sp.storehouseId, orderProductId: orP.id },
			})
		}

		const orderProduct = await this.prisma.orderProduct.update({
			where: { id: query.id },
			data: {
				quantity: body.quantity,
				spsId: body.spsId,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
				orderId: body.orderId,
				status: body.status,
			},
		})

		return orderProduct
	}

	async deleteOne(query: OrderProductDeleteOneRequest) {
		const orderProduct = await this.prisma.orderProduct.delete({
			where: { id: query.id },
		})
		return orderProduct
	}

	async deleteMany(query: OrderProductDeleteOneRequest[]) {
		const orderProduct = await this.prisma.orderProduct.deleteMany({
			where: { id: { in: query.map((q) => q.id) } },
		})
		return orderProduct
	}
}
