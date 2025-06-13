import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	StorehouseProductCreateOneRequest,
	StorehouseProductDeleteOneRequest,
	StorehouseProductFindManyRequest,
	StorehouseProductFindOneRequest,
	StorehouseProductGetManyRequest,
	StorehouseProductGetOneRequest,
	StorehouseProductUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class StorehouseProductRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StorehouseProductFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sps = await this.prisma.sP.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				storehouseId: query.storehouseId,
				OR: [
					{ product: { publicId: { contains: query.search, mode: 'insensitive' } } },
					{ product: { model: { name: { contains: query.search, mode: 'insensitive' } } } },
					{ product: { model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } } },
				],
				// statuses: {
				// 	some: {
				// 		status: {
				// 			in: query.statuses,
				// 		},
				// 	},
				// },
			},
			select: {
				id: true,
				createdAt: true,
				product: {
					select: {
						id: true,
						description: true,
						direction: true,
						publicId: true,
						quantity: true,
						tissue: true,
						model: { select: { id: true, name: true, createdAt: true, furnitureType: { select: { id: true, name: true, createdAt: true } } } },
					},
				},
				storehouse: {
					select: { name: true, type: true, createdAt: true, id: true },
				},
				statuses: { select: { id: true, createdAt: true, quantity: true, status: true } },
			},
			...paginationOptions,
		})

		return sps
	}

	async findOne(query: StorehouseProductFindOneRequest) {
		const sp = await this.prisma.sP.findFirst({
			where: {
				id: query.id,
			},
		})

		return sp
	}

	async countFindMany(query: StorehouseProductFindManyRequest) {
		const spCount = await this.prisma.sP.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				productId: query.productId,
				storehouseId: query.storehouseId,
				OR: [
					{ product: { publicId: { contains: query.search, mode: 'insensitive' } } },
					{ product: { model: { name: { contains: query.search, mode: 'insensitive' } } } },
					{ product: { model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } } },
				],
				// statuses: {
				// 	some: {
				// 		status: {
				// 			in: query.statuses,
				// 		},
				// 	},
				// },
			},
		})

		return spCount
	}

	async getMany(query: StorehouseProductGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sps = await this.prisma.sP.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				storehouseId: query.storehouseId,
			},
			...paginationOptions,
		})

		return sps
	}

	async getOne(query: StorehouseProductGetOneRequest) {
		const sp = await this.prisma.sP.findFirst({
			where: {
				id: query.id,
				storehouseId: query.storehouseId,
			},
		})

		return sp
	}

	async countGetMany(query: StorehouseProductGetManyRequest) {
		const spCount = await this.prisma.sP.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				storehouseId: query.storehouseId,
			},
		})

		return spCount
	}

	async createOne(body: StorehouseProductCreateOneRequest) {
		const sp = await this.prisma.sP.create({
			data: {
				storehouseId: body.storehouseId,
				productId: body.productId,
			},
		})
		return sp
	}

	async updateOne(query: StorehouseProductGetOneRequest, body: StorehouseProductUpdateOneRequest) {
		const sp = await this.prisma.sP.update({
			where: { id: query.id },
			data: {
				storehouseId: body.storehouseId,
				productId: body.productId,
				deletedAt: body.deletedAt,
			},
		})

		return sp
	}

	async deleteOne(query: StorehouseProductDeleteOneRequest) {
		const sp = await this.prisma.sP.delete({
			where: { id: query.id },
		})
		return sp
	}
}
