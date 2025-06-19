import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import { SPSCreateOneRequest, SPSDeleteOneRequest, SPSFindManyRequest, SPSFindOneRequest, SPSGetManyRequest, SPSGetOneRequest, SPSUpdateOneRequest } from './interfaces'
import { deletedAtConverter } from '../../common'
import { ProductType, SPStatus } from '@prisma/client'

@Injectable()
export class SPSRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: SPSFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const spss = await this.prisma.sPS.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				spId: query.spId,
				status: query.status ?? { not: SPStatus.pending },
				sp: { product: { type: { not: ProductType.nonstandart } } },
			},
			...paginationOptions,
		})

		return spss
	}

	async findOne(query: SPSFindOneRequest) {
		const sps = await this.prisma.sPS.findFirst({
			where: {
				id: query.id,
			},
		})

		return sps
	}

	async countFindMany(query: SPSFindManyRequest) {
		const spsCount = await this.prisma.sPS.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				spId: query.spId,
				status: query.status,
			},
		})

		return spsCount
	}

	async getMany(query: SPSGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const spss = await this.prisma.sPS.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
			...paginationOptions,
		})

		return spss
	}

	async getOne(query: SPSGetOneRequest) {
		const sps = await this.prisma.sPS.findFirst({
			where: {
				id: query.id,
				status: query.status,
			},
		})

		return sps
	}

	async countGetMany(query: SPSGetManyRequest) {
		const spsCount = await this.prisma.sPS.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				status: query.status,
			},
		})

		return spsCount
	}

	async createOne(body: SPSCreateOneRequest) {
		const sps = await this.prisma.sPS.create({
			data: {
				status: body.status,
				spId: body.spId,
				quantity: body.quantity,
			},
		})
		return sps
	}

	async updateOne(query: SPSGetOneRequest, body: SPSUpdateOneRequest) {
		const sps = await this.prisma.sPS.update({
			where: { id: query.id },
			data: {
				status: body.status,
				spId: body.spId,
				quantity: body.quantity,
				deletedAt: body.deletedAt,
			},
		})

		return sps
	}

	async deleteOne(query: SPSDeleteOneRequest) {
		const sps = await this.prisma.sPS.delete({
			where: { id: query.id },
		})
		return sps
	}
}
