import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	PurchaseCreateOneRequest,
	PurchaseDeleteOneRequest,
	PurchaseFindManyRequest,
	PurchaseFindOneRequest,
	PurchaseGetManyRequest,
	PurchaseGetOneRequest,
	PurchaseUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { ProductMVType } from '@prisma/client'

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
			},
			...paginationOptions,
		})

		return purchases
	}

	async findOne(query: PurchaseFindOneRequest) {
		const staff = await this.prisma.purchase.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				status: true,
				createdAt: true,
			},
		})

		return staff
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
		const staff = await this.prisma.purchase.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
		})

		return staff
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

		for (const product of body.productMVs) {
			await this.prisma.productMV.create({
				data: {
					type: ProductMVType.selling,
					productId: product.id,
					purchaseId: purchase.id,
					statuses: {
						createMany: {
							skipDuplicates: false,
							data: product.statuses.map((s) => ({
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
}
