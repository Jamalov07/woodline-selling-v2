import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	PurchaseCreateOneRequest,
	PurchaseDeleteOneRequest,
	PurchaseFindManyRequest,
	PurchaseFindOneRequest,
	PurchaseGetManyRequest,
	PurchaseGetOneRequest,
	PurchaseProduct,
	PurchaseUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { InventoryStatus, ProductMVType } from '@prisma/client'

@Injectable()
export class PurchaseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: PurchaseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const purchases = await this.prisma.purchase.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			select: {
				id: true,
				status: true,
				createdAt: true,
				provider: { select: { id: true, phone: true, fullname: true } },
				storehouse: { select: { id: true, name: true, type: true } },
				storekeeper: { select: { id: true, phone: true, fullname: true } },
				productMVs: {
					select: {
						product: {
							select: {
								id: true,
								createdAt: true,
								type: true,
								publicId: true,
								tissue: true,
								direction: true,
								quantity: true,
								description: true,
								model: { select: { id: true, name: true, furnitureType: { select: { id: true, name: true } } } },
							},
						},
						statuses: true,
					},
				},
			},
			...paginationOptions,
		})

		return purchases
	}

	async findOne(query: PurchaseFindOneRequest) {
		const purchase = await this.prisma.purchase.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				status: true,
				createdAt: true,
				provider: { select: { id: true, phone: true, fullname: true } },
				storehouse: { select: { id: true, name: true, type: true } },
				storekeeper: { select: { id: true, phone: true, fullname: true } },
				productMVs: {
					select: {
						product: {
							select: {
								id: true,
								createdAt: true,
								type: true,
								publicId: true,
								tissue: true,
								direction: true,
								quantity: true,
								description: true,
								model: { select: { id: true, name: true, furnitureType: { select: { id: true, name: true } } } },
							},
						},
						statuses: true,
					},
				},
			},
		})

		return purchase
	}

	async countFindMany(query: PurchaseFindManyRequest) {
		const purchaseCount = await this.prisma.purchase.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return purchaseCount
	}

	async getMany(query: PurchaseGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const purchases = await this.prisma.purchase.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			...paginationOptions,
		})

		return purchases
	}

	async getOne(query: PurchaseGetOneRequest) {
		const purchase = await this.prisma.purchase.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
			select: {
				id: true,
				status: true,
				provider: true,
				storehouse: true,
				productMVs: { select: { id: true, product: true, statuses: true } },
			},
		})

		return purchase
	}

	async countGetMany(query: PurchaseGetManyRequest) {
		const purchaseCount = await this.prisma.purchase.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return purchaseCount
	}

	async createOne(body: PurchaseCreateOneRequest) {
		const purchase = await this.prisma.purchase.create({
			data: {
				providerId: body.providerId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
			},
		})

		const productmvs = {}
		for (const pr of body.productMVs) {
			if (!productmvs[pr.id]) {
				productmvs[pr.id] = []
			}
			productmvs[pr.id].push({ status: pr.status, quantity: pr.quantity })
		}

		console.log(productmvs)

		for (const productId of Object.keys(productmvs)) {
			await this.prisma.productMV.create({
				data: {
					type: ProductMVType.purchase,
					productId: productId,
					purchaseId: purchase.id,
					statuses: {
						createMany: {
							skipDuplicates: false,
							data: productmvs[productId].map((s: Omit<PurchaseProduct, 'id'>) => ({
								quantity: s.quantity,
								status: s.status,
							})),
						},
					},
				},
			})
		}

		return purchase
	}

	async updateOne(query: PurchaseGetOneRequest, body: PurchaseUpdateOneRequest) {
		if (body.status === InventoryStatus.accepted) {
			await this.addProductToStorehouse(query.id)
		}

		const purchase = await this.prisma.purchase.update({
			where: { id: query.id },
			data: {
				providerId: body.providerId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
				status: body.status,
				deletedAt: body.deletedAt,
			},
		})

		return purchase
	}

	async deleteOne(query: PurchaseDeleteOneRequest) {
		const purchase = await this.prisma.purchase.delete({
			where: { id: query.id },
		})
		return purchase
	}

	async addProductToStorehouse(id: string) {
		const pur = await this.getOne({ id: id })

		for (const pr of pur.productMVs) {
			const sp = await this.prisma.sP.findFirst({
				where: {
					productId: pr.product.id,
					storehouseId: pur.storehouse.id,
				},
			})
			if (sp) {
				for (const status of pr.statuses) {
					const sps = await this.prisma.sPS.findFirst({
						where: { spId: sp.id, status: status.status },
					})

					if (sps) {
						await this.prisma.sPS.update({ where: { id: sps.id }, data: { quantity: { increment: status.quantity } } })
					} else {
						await this.prisma.sPS.create({ data: { quantity: status.quantity, status: status.status, spId: sp.id } })
					}
				}
			} else {
				await this.prisma.sP.create({
					data: {
						productId: pr.product.id,
						storehouseId: pur.storehouse.id,
						statuses: {
							createMany: {
								skipDuplicates: false,
								data: pr.statuses.map((s) => ({ status: s.status, quantity: s.quantity })),
							},
						},
					},
				})
			}
		}
	}
}
