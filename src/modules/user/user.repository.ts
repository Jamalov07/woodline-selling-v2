import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { UserCreateOneRequest, UserDeleteOneRequest, UserFindManyRequest, UserFindOneRequest, UserGetManyRequest, UserGetOneRequest, UserUpdateOneRequest } from './interfaces'

@Injectable()
export class UserRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: UserFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const users = await this.prisma.user.findMany({
			where: {
				fullname: query.fullname,
				// roles: { some: { name: { in: query.roleNames } } },
				OR: [{ fullname: { contains: query.search, mode: 'insensitive' } }, { phone: { contains: query.search, mode: 'insensitive' } }],
			},
			select: {
				id: true,
				fullname: true,
				phone: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},
			...paginationOptions,
		})

		return users
	}

	async findOne(query: UserFindOneRequest) {
		const user = await this.prisma.user.findFirst({
			where: { id: query.id },
			select: {
				id: true,
				fullname: true,
				phone: true,
				actions: true,
				roles: true,
				updatedAt: true,
				createdAt: true,
				deletedAt: true,
			},
		})

		return user
	}

	async countFindMany(query: UserFindManyRequest) {
		const usersCount = await this.prisma.user.count({
			where: {
				fullname: query.fullname,
				roles: { some: { name: { in: query.roleNames } } },
				OR: [{ fullname: { contains: query.search, mode: 'insensitive' } }, { phone: { contains: query.search, mode: 'insensitive' } }],
			},
		})

		return usersCount
	}

	async getMany(query: UserGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const users = await this.prisma.user.findMany({
			where: { id: { in: query.ids }, fullname: query.fullname },
			...paginationOptions,
		})

		return users
	}

	async getOne(query: UserGetOneRequest) {
		const user = await this.prisma.user.findFirst({
			where: { id: query.id, fullname: query.fullname, phone: query.phone },
			select: { id: true, fullname: true, phone: true, createdAt: true, deletedAt: true, roles: true, password: true, token: true, soldToMe: true },
		})

		return user
	}

	async countGetMany(query: UserGetManyRequest) {
		const usersCount = await this.prisma.user.count({
			where: { id: { in: query.ids }, fullname: query.fullname },
		})

		return usersCount
	}

	async createOne(body: UserCreateOneRequest) {
		const user = await this.prisma.user.create({
			data: {
				fullname: body.fullname,
				password: body.password,
				source: body.source,
				phone: body.phone,
				roles: { connect: body.rolesToConnect.map((r) => ({ name: r })) },
				actions: { connect: body.actionsToConnect.map((r) => ({ id: r })) },
				storehouse: { create: { storehouseId: body.storehouseId } },
			},
		})
		return user
	}

	async updateOne(query: UserGetOneRequest, body: UserUpdateOneRequest) {
		const user = await this.prisma.user.update({
			where: { id: query.id },
			data: {
				fullname: body.fullname,
				password: body.password,
				source: body.source,
				balance: body.balance,
				phone: body.phone,
				token: body.token,
				deletedAt: body.deletedAt,
				roles: {
					connect: (body.rolesToConnect ?? []).map((r) => ({ name: r })),
					disconnect: (body.rolesToDisconnect ?? []).map((r) => ({ name: r })),
				},
				actions: {
					connect: (body.actionsToConnect ?? []).map((r) => ({ id: r })),
					disconnect: (body.actionsToDisconnect ?? []).map((r) => ({ id: r })),
				},
				storehouse: { update: { storehouseId: body.storehouseId } },
			},
		})

		return user
	}

	async deleteOne(query: UserDeleteOneRequest) {
		const user = await this.prisma.user.delete({
			where: { id: query.id },
		})

		return user
	}
}
