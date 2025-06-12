import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	ProductMVCreateOneRequest,
	ProductMVDeleteOneRequest,
	ProductMVFindManyRequest,
	ProductMVFindOneRequest,
	ProductMVGetManyRequest,
	ProductMVGetOneRequest,
	ProductMVUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class ProductMVRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProductMVFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const productMVs = await this.prisma.productMV.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				sellingId: query.sellingId,
				transferId: query.transferId,
				purchaseId: query.purchaseId,
				type: query.type,
			},

			...paginationOptions,
		})

		return productMVs
	}

	async findOne(query: ProductMVFindOneRequest) {
		const staff = await this.prisma.productMV.findFirst({
			where: {
				id: query.id,
			},
		})

		return staff
	}

	async countFindMany(query: ProductMVFindManyRequest) {
		const productMVCount = await this.prisma.productMV.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				sellingId: query.sellingId,
				transferId: query.transferId,
				purchaseId: query.purchaseId,
				type: query.type,
			},
		})

		return productMVCount
	}

	async getMany(query: ProductMVGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const productMVs = await this.prisma.productMV.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellingId: query.sellingId,
			},
			...paginationOptions,
		})

		return productMVs
	}

	async getOne(query: ProductMVGetOneRequest) {
		const staff = await this.prisma.productMV.findFirst({
			where: {
				id: query.id,
				sellingId: query.sellingId,
			},
		})

		return staff
	}

	async countGetMany(query: ProductMVGetManyRequest) {
		const productMVCount = await this.prisma.productMV.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellingId: query.sellingId,
			},
		})

		return productMVCount
	}

	async createOne(body: ProductMVCreateOneRequest) {
		const productMV = await this.prisma.productMV.create({
			data: {
				sellingId: body.sellingId,
				productId: body.productId,
				type: body.type,
				purchaseId: body.purchaseId,
				transferId: body.transferId,
			},
		})
		return productMV
	}

	async updateOne(query: ProductMVGetOneRequest, body: ProductMVUpdateOneRequest) {
		const productMV = await this.prisma.productMV.update({
			where: { id: query.id },
			data: {
				sellingId: body.sellingId,
				productId: body.productId,
				type: body.type,
				purchaseId: body.purchaseId,
				transferId: body.transferId,
				deletedAt: body.deletedAt,
			},
		})

		return productMV
	}

	async deleteOne(query: ProductMVDeleteOneRequest) {
		const productMV = await this.prisma.productMV.delete({
			where: { id: query.id },
		})
		return productMV
	}
}
