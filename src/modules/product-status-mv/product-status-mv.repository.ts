import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	ProductStatusMVCreateOneRequest,
	ProductStatusMVDeleteOneRequest,
	ProductStatusMVFindManyRequest,
	ProductStatusMVFindOneRequest,
	ProductStatusMVGetManyRequest,
	ProductStatusMVGetOneRequest,
	ProductStatusMVUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class ProductStatusMVRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProductStatusMVFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const productStatusMVs = await this.prisma.productStatusMV.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productMVId: query.productMVId,
				status: query.status,
			},
			...paginationOptions,
		})

		return productStatusMVs
	}

	async findOne(query: ProductStatusMVFindOneRequest) {
		const productStatusMV = await this.prisma.productStatusMV.findFirst({
			where: {
				id: query.id,
			},
		})

		return productStatusMV
	}

	async countFindMany(query: ProductStatusMVFindManyRequest) {
		const productStatusMVCount = await this.prisma.productStatusMV.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productMVId: query.productMVId,
				status: query.status,
			},
		})

		return productStatusMVCount
	}

	async getMany(query: ProductStatusMVGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const productStatusMVs = await this.prisma.productStatusMV.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			...paginationOptions,
		})

		return productStatusMVs
	}

	async getOne(query: ProductStatusMVGetOneRequest) {
		const productStatusMV = await this.prisma.productStatusMV.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
		})

		return productStatusMV
	}

	async countGetMany(query: ProductStatusMVGetManyRequest) {
		const productStatusMVCount = await this.prisma.productStatusMV.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return productStatusMVCount
	}

	async createOne(body: ProductStatusMVCreateOneRequest) {
		const productStatusMV = await this.prisma.productStatusMV.create({
			data: {
				status: body.status,
				productMVId: body.productMVId,
				quantity: body.quantity,
			},
		})
		return productStatusMV
	}

	async updateOne(query: ProductStatusMVGetOneRequest, body: ProductStatusMVUpdateOneRequest) {
		const productStatusMV = await this.prisma.productStatusMV.update({
			where: { id: query.id },
			data: {
				status: body.status,
				productMVId: body.productMVId,
				quantity: body.quantity,
				deletedAt: body.deletedAt,
			},
		})

		return productStatusMV
	}

	async deleteOne(query: ProductStatusMVDeleteOneRequest) {
		const productStatusMV = await this.prisma.productStatusMV.delete({
			where: { id: query.id },
		})
		return productStatusMV
	}
}
