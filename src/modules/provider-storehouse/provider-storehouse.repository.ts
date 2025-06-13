import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	ProviderStorehouseCreateOneRequest,
	ProviderStorehouseDeleteOneRequest,
	ProviderStorehouseFindManyRequest,
	ProviderStorehouseFindOneRequest,
	ProviderStorehouseGetManyRequest,
	ProviderStorehouseGetOneRequest,
	ProviderStorehouseUpdateOneRequest,
} from './interfaces'

@Injectable()
export class ProviderStorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProviderStorehouseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const providerStorehouses = await this.prisma.providerStorehouse.findMany({
			where: {
				providerId: query.providerId,
				storehouseId: query.storehouseId,
			},
			...paginationOptions,
		})

		return providerStorehouses
	}

	async findOne(query: ProviderStorehouseFindOneRequest) {
		const providerStorehouse = await this.prisma.providerStorehouse.findFirst({
			where: {
				providerId: query.providerId,
			},
		})

		return providerStorehouse
	}

	async countFindMany(query: ProviderStorehouseFindManyRequest) {
		const providerStorehouseCount = await this.prisma.providerStorehouse.count({
			where: {
				providerId: query.providerId,
			},
		})

		return providerStorehouseCount
	}

	async getMany(query: ProviderStorehouseGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const providerStorehouses = await this.prisma.providerStorehouse.findMany({
			where: {
				storehouseId: query.storehouseId,
			},
			...paginationOptions,
		})

		return providerStorehouses
	}

	async getOne(query: ProviderStorehouseGetOneRequest) {
		const providerStorehouse = await this.prisma.providerStorehouse.findFirst({
			where: {
				providerId: query.providerId,
				storehouseId: query.storehouseId,
			},
		})

		return providerStorehouse
	}

	async countGetMany(query: ProviderStorehouseGetManyRequest) {
		const providerStorehouseCount = await this.prisma.providerStorehouse.count({
			where: {
				storehouseId: query.storehouseId,
			},
		})

		return providerStorehouseCount
	}

	async createOne(body: ProviderStorehouseCreateOneRequest) {
		const providerStorehouse = await this.prisma.providerStorehouse.create({
			data: {
				storehouseId: body.storehouseId,
				providerId: body.providerId,
			},
		})
		return providerStorehouse
	}

	async updateOne(query: ProviderStorehouseGetOneRequest, body: ProviderStorehouseUpdateOneRequest) {
		const providerStorehouse = await this.prisma.providerStorehouse.update({
			where: { providerId: query.providerId },
			data: {
				storehouseId: body.storehouseId,
				providerId: body.providerId,
			},
		})

		return providerStorehouse
	}

	async deleteOne(query: ProviderStorehouseDeleteOneRequest) {
		const providerStorehouse = await this.prisma.providerStorehouse.delete({
			where: { providerId: query.providerId },
		})
		return providerStorehouse
	}
}
