import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	TransferCreateOneRequest,
	TransferDeleteOneRequest,
	TransferFindManyRequest,
	TransferFindOneRequest,
	TransferGetManyRequest,
	TransferGetOneRequest,
	TransferUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class TransferRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: TransferFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const transfers = await this.prisma.transfer.findMany({
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

		return transfers
	}

	async findOne(query: TransferFindOneRequest) {
		const staff = await this.prisma.transfer.findFirst({
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

	async countFindMany(query: TransferFindManyRequest) {
		const transferCount = await this.prisma.transfer.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return transferCount
	}

	async getMany(query: TransferGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const transfers = await this.prisma.transfer.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			...paginationOptions,
		})

		return transfers
	}

	async getOne(query: TransferGetOneRequest) {
		const staff = await this.prisma.transfer.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
		})

		return staff
	}

	async countGetMany(query: TransferGetManyRequest) {
		const transferCount = await this.prisma.transfer.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return transferCount
	}

	async createOne(body: TransferCreateOneRequest) {
		const transfer = await this.prisma.transfer.create({
			data: {
				toStorehouseId: body.toStorehouseId,
				fromStorehouseId: body.fromStorehouseId,
				toStorekeeperId: body.toStorekeeperId,
				fromStorekeeperId: body.fromStorekeeperId,
			},
		})
		return transfer
	}

	async updateOne(query: TransferGetOneRequest, body: TransferUpdateOneRequest) {
		const transfer = await this.prisma.transfer.update({
			where: { id: query.id },
			data: {
				toStorehouseId: body.toStorehouseId,
				fromStorehouseId: body.fromStorehouseId,
				toStorekeeperId: body.toStorekeeperId,
				fromStorekeeperId: body.fromStorekeeperId,
				status: body.status,
				deletedAt: body.deletedAt,
			},
		})

		return transfer
	}

	async deleteOne(query: TransferDeleteOneRequest) {
		const transfer = await this.prisma.transfer.delete({
			where: { id: query.id },
		})
		return transfer
	}
}
