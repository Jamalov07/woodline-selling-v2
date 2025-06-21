import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { ActionFindManyRequest, ActionFindOneRequest, ActionGetManyRequest, ActionGetOneRequest, ActionUpdateOneRequest } from './interfaces'
import { Prisma } from '@prisma/client'

@Injectable()
export class ActionRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ActionFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}
		const where: Prisma.ActionWhereInput = {}

		if (query.method) {
			where.method = query.method
		}

		if (query.search) {
			where.OR = [
				{ url: { contains: query.search, mode: 'insensitive' } },
				{ name: { contains: query.search, mode: 'insensitive' } },
				{ description: { contains: query.search, mode: 'insensitive' } },
			]
		}

		const actions = await this.prisma.action.findMany({
			where,
			select: { id: true, name: true, url: true, description: true, method: true, createdAt: true, roles: true },
			...paginationOptions,
		})

		return actions
	}

	async countFindMany(query: ActionFindManyRequest) {
		const where: Prisma.ActionWhereInput = {}

		if (query.method) {
			where.method = query.method
		}

		if (query.search) {
			where.OR = [
				{ url: { contains: query.search, mode: 'insensitive' } },
				{ name: { contains: query.search, mode: 'insensitive' } },
				{ description: { contains: query.search, mode: 'insensitive' } },
			]
		}
		const actionsCount = await this.prisma.action.count({
			where: where,
		})

		return actionsCount
	}

	async findOne(query: ActionFindOneRequest) {
		const action = await this.prisma.action.findFirst({
			where: {
				id: query.id,
				method: query.method,
				url: { contains: query.url, mode: 'insensitive' },
				name: { contains: query.name, mode: 'insensitive' },
				description: { contains: query.description, mode: 'insensitive' },
			},
			select: { id: true, name: true, url: true, description: true, method: true, createdAt: true, roles: true },
		})

		return action
	}

	async getMany(query: ActionGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const actions = await this.prisma.action.findMany({
			where: {
				id: { in: query.ids },
				method: query.method,
				url: query.url,
				name: query.name,
				description: query.description,
			},
			...paginationOptions,
		})

		return actions
	}

	async countGetMany(query: ActionGetManyRequest) {
		const actionsCount = await this.prisma.action.count({
			where: {
				id: { in: query.ids },
				method: query.method,
				url: query.url,
				name: query.name,
				description: query.description,
			},
		})

		return actionsCount
	}

	async getOne(query: ActionGetOneRequest) {
		const action = await this.prisma.action.findFirst({
			where: {
				id: query.id,
				method: query.method,
				url: query.url,
				name: query.name,
				description: query.description,
			},
		})

		return action
	}
	async updateOne(query: ActionGetOneRequest, body: ActionUpdateOneRequest) {
		const action = await this.prisma.action.update({ where: { id: query.id }, data: { description: body.description } })

		return action
	}
}
