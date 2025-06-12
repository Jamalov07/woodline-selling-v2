import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	SellingCreateOneRequest,
	SellingDeleteOneRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetManyRequest,
	SellingGetOneRequest,
	SellingUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class SellingRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: SellingFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.selling.findMany({
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

		return sellings
	}

	async findOne(query: SellingFindOneRequest) {
		const staff = await this.prisma.selling.findFirst({
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

	async countFindMany(query: SellingFindManyRequest) {
		const sellingCount = await this.prisma.selling.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return sellingCount
	}

	async getMany(query: SellingGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.selling.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			...paginationOptions,
		})

		return sellings
	}

	async getOne(query: SellingGetOneRequest) {
		const staff = await this.prisma.selling.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
		})

		return staff
	}

	async countGetMany(query: SellingGetManyRequest) {
		const sellingCount = await this.prisma.selling.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return sellingCount
	}

	async createOne(body: SellingCreateOneRequest) {
		const selling = await this.prisma.selling.create({
			data: {
				orderId: body.orderId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
			},
		})
		return selling
	}

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		const selling = await this.prisma.selling.update({
			where: { id: query.id },
			data: {
				orderId: body.orderId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
				status: body.status,
				deletedAt: body.deletedAt,
			},
		})

		return selling
	}

	async deleteOne(query: SellingDeleteOneRequest) {
		const selling = await this.prisma.selling.delete({
			where: { id: query.id },
		})
		return selling
	}
}
