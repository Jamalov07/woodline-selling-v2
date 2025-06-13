import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	ModelCreateOneRequest,
	ModelDeleteOneRequest,
	ModelFindManyRequest,
	ModelFindOneRequest,
	ModelGetManyRequest,
	ModelGetOneRequest,
	ModelUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class ModelRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ModelFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const models = await this.prisma.model.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				name: { contains: query.name, mode: 'insensitive' },
			},
			select: {
				id: true,
				name: true,
				createdAt: true,
				furnitureType: { select: { id: true, name: true, createdAt: true } },
				provider: { select: { id: true, fullname: true, phone: true, balance: true, createdAt: true } },
			},
			...paginationOptions,
		})

		return models
	}

	async findOne(query: ModelFindOneRequest) {
		const model = await this.prisma.model.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				name: true,
				createdAt: true,
				furnitureType: { select: { id: true, name: true, createdAt: true } },
				provider: { select: { id: true, fullname: true, phone: true, balance: true, createdAt: true } },
			},
		})

		return model
	}

	async countFindMany(query: ModelFindManyRequest) {
		const modelCount = await this.prisma.model.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				name: { contains: query.name, mode: 'insensitive' },
			},
		})

		return modelCount
	}

	async getMany(query: ModelGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const models = await this.prisma.model.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
			...paginationOptions,
		})

		return models
	}

	async getOne(query: ModelGetOneRequest) {
		const model = await this.prisma.model.findFirst({
			where: {
				id: query.id,
				name: query.name,
			},
		})

		return model
	}

	async countGetMany(query: ModelFindManyRequest) {
		const modelCount = await this.prisma.model.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				name: query.name,
			},
		})

		return modelCount
	}

	async createOne(body: ModelCreateOneRequest) {
		const model = await this.prisma.model.create({
			data: { name: body.name, furnitureTypeId: body.furnitureTypeId, providerId: body.providerId },
		})
		return model
	}

	async updateOne(query: ModelGetOneRequest, body: ModelUpdateOneRequest) {
		const model = await this.prisma.model.update({
			where: { id: query.id },
			data: { name: body.name, furnitureTypeId: body.furnitureTypeId, providerId: body.providerId },
		})

		return model
	}

	async deleteOne(query: ModelDeleteOneRequest) {
		const model = await this.prisma.model.delete({
			where: { id: query.id },
		})
		return model
	}
}
