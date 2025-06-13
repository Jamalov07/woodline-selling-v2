import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	StorehouseCreateOneRequest,
	StorehouseDeleteOneRequest,
	StorehouseFindManyRequest,
	StorehouseFindOneRequest,
	StorehouseGetManyRequest,
	StorehouseGetOneRequest,
	StorehouseUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'
import { StorehouseController } from './storehouse.controller'

@Injectable()
export class StorehouseRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: StorehouseFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouse.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				name: { contains: query.name, mode: 'insensitive' },
				type: query.type,
			},
			...paginationOptions,
		})

		return storehouses
	}

	async findOne(query: StorehouseFindOneRequest) {
		const storehouse = await this.prisma.storehouse.findFirst({
			where: {
				id: query.id,
			},
		})

		return storehouse
	}

	async countFindMany(query: StorehouseFindManyRequest) {
		const storehouseCount = await this.prisma.storehouse.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				type: query.type,
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return storehouseCount
	}

	async getMany(query: StorehouseGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const storehouses = await this.prisma.storehouse.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
			...paginationOptions,
		})

		return storehouses
	}

	async getOne(query: StorehouseGetOneRequest) {
		const storehouse = await this.prisma.storehouse.findFirst({
			where: {
				id: query.id,
				name: query.name,
			},
		})

		return storehouse
	}

	async countGetMany(query: StorehouseGetManyRequest) {
		const storehouseCount = await this.prisma.storehouse.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
		})

		return storehouseCount
	}

	async createOne(body: StorehouseCreateOneRequest) {
		const storehouse = await this.prisma.storehouse.create({
			data: { name: body.name, type: body.type },
		})
		return storehouse
	}

	async updateOne(query: StorehouseGetOneRequest, body: StorehouseUpdateOneRequest) {
		const storehouse = await this.prisma.storehouse.update({
			where: { id: query.id },
			data: { name: body.name, type: body.type, deletedAt: body.deletedAt },
		})

		return storehouse
	}

	async deleteOne(query: StorehouseDeleteOneRequest) {
		const storehouse = await this.prisma.storehouse.delete({
			where: { id: query.id },
		})
		return storehouse
	}
}
