import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { RoleFindManyRequest, RoleFindOneRequest, RoleGetManyRequest, RoleGetOneRequest, RoleUpdateOneRequest } from './interfaces'
import { RoleName } from '@prisma/client'

@Injectable()
export class RoleRepository implements OnModuleInit {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: RoleFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const roles = await this.prisma.role.findMany({
			where: {
				name: query.name,
			},
			select: { name: true, actions: { select: { id: true, name: true, method: true, description: true, url: true } } },
			...paginationOptions,
		})

		return roles
	}

	async findOne(query: RoleFindOneRequest) {
		const role = await this.prisma.role.findFirst({
			where: {
				name: query.name,
			},
			select: { name: true, actions: { select: { id: true, name: true, method: true, description: true, url: true, createdAt: true } } },
		})

		return role
	}

	async countFindMany(query: RoleFindManyRequest) {
		const rolesCount = await this.prisma.role.count({
			where: {
				name: query.name,
			},
		})

		return rolesCount
	}

	async getMany(query: RoleGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const roles = await this.prisma.role.findMany({
			where: { name: query.name },
			...paginationOptions,
		})

		return roles
	}

	async getOne(query: RoleGetOneRequest) {
		const role = await this.prisma.role.findFirst({
			where: { name: query.name },
		})

		return role
	}

	async countGetMany(query: RoleGetManyRequest) {
		const rolesCount = await this.prisma.role.count({
			where: { name: query.name },
		})

		return rolesCount
	}

	async createRoles() {
		const roleNames = Object.values(RoleName)

		await this.prisma.role.createManyAndReturn({
			data: roleNames.map((r) => ({ name: r })),
			skipDuplicates: true,
		})
	}

	async updateOne(query: RoleGetOneRequest, body: RoleUpdateOneRequest) {
		const role = await this.prisma.role.update({
			where: { name: query.name },
			data: {
				actions: {
					connect: body.actionsToConnect.map((a) => ({ id: a })),
					disconnect: body.actionsToDisconnect.map((a) => ({ id: a })),
				},
			},
		})

		return role
	}

	async onModuleInit() {
		await this.createRoles()
	}
}
