import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { CartCreateOneRequest, CartDeleteOneRequest, CartFindManyRequest, CartFindOneRequest, CartGetManyRequest, CartGetOneRequest, CartUpdateOneRequest } from './interfaces'
import { deletedAtConverter } from '../../common'
import { OrderProductType, ProductType, SPStatus } from '@prisma/client'

@Injectable()
export class CartRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: CartFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const carts = await this.prisma.cart.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
			select: {
				id: true,
				type: true,
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

		return carts
	}

	async findOne(query: CartFindOneRequest) {
		const seller = await this.prisma.cart.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				createdAt: true,
				type: true,
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

	async countFindMany(query: CartFindManyRequest) {
		const cartCount = await this.prisma.cart.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
		})

		return cartCount
	}

	async getMany(query: CartGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const carts = await this.prisma.cart.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
			...paginationOptions,
		})

		return carts
	}

	async getOne(query: CartGetOneRequest) {
		const seller = await this.prisma.cart.findFirst({
			where: {
				id: query.id,
			},
		})

		return seller
	}

	async countGetMany(query: CartGetManyRequest) {
		const cartCount = await this.prisma.cart.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
				spsId: query.spsId,
			},
		})

		return cartCount
	}

	async createOne(body: CartCreateOneRequest) {
		let product: { id: string; SPs: { storehouseId: string; statuses: { status: SPStatus; id: string }[] }[] }
		let spsCustomId: string
		if (!body.spsId) {
			const model = await this.prisma.model.findFirst({
				where: { id: body.productDetail.modelId },
				select: { provider: { select: { storehouse: { select: { storehouseId: true } } } } },
			})

			product = await this.prisma.product.findFirst({
				where: {
					publicId: body.productDetail.publicId,
					type: ProductType.nonstandart,
					direction: body.productDetail.direction,
					tissue: body.productDetail.tissue,
					modelId: body.productDetail.modelId,
					quantity: body.productDetail.quantity,
				},
				select: {
					id: true,
					SPs: {
						where: { storehouseId: model.provider.storehouse.storehouseId },
						select: {
							storehouseId: true,
							statuses: {
								where: { status: SPStatus.pending },
								select: { status: true, id: true },
							},
						},
					},
				},
			})

			if (product) {
				let pendingStatusId = product?.SPs[0]?.statuses[0]?.id

				if (!pendingStatusId) {
					const pendingStatus = await this.prisma.sP.create({
						data: {
							productId: product.id,
							storehouseId: model.provider.storehouse.storehouseId,
							statuses: { create: { status: SPStatus.pending } },
						},
						select: { statuses: true },
					})
					pendingStatusId = pendingStatus[0]?.id
				}
				spsCustomId = pendingStatusId
			} else {
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
					select: { id: true, SPs: { select: { storehouseId: true, statuses: { select: { id: true, status: true } } } } },
				})
				spsCustomId = product?.SPs[0]?.statuses[0]?.id
			}
			if (!spsCustomId) {
				return null
			}
		}

		const cart = await this.prisma.cart.create({
			data: {
				type: body.spsId ? OrderProductType.standart : OrderProductType.nonstandart,
				sellerId: body.sellerId,
				spsId: body.spsId ? body.spsId : spsCustomId,
				quantity: body.quantity,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
			},
		})
		return cart
	}

	async updateOne(query: CartGetOneRequest, body: CartUpdateOneRequest) {
		const c = await this.getOne({ id: query.id })

		if (body.productDetail) {
			if (c.type === OrderProductType.nonstandart) {
				const sps = await this.prisma.sPS.findFirst({
					where: { id: c.spsId },
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

		const cart = await this.prisma.cart.update({
			where: { id: query.id },
			data: {
				quantity: body.quantity,
				spsId: body.spsId,
				description: body.description,
				price: body.price,
				priceWithSale: body.priceWithSale,
				sale: body.sale,
				totalSum: body.totalSum,
			},
		})

		return cart
	}

	async deleteOne(query: CartDeleteOneRequest) {
		const cart = await this.prisma.cart.delete({
			where: { id: query.id },
		})
		return cart
	}

	async deleteMany(query: CartDeleteOneRequest[]) {
		const cart = await this.prisma.cart.deleteMany({
			where: { id: { in: query.map((q) => q.id) } },
		})
		return cart
	}
}
