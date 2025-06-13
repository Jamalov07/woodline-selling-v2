import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	SPSBookingCreateOneRequest,
	SPSBookingDeleteOneRequest,
	SPSBookingFindManyRequest,
	SPSBookingFindOneRequest,
	SPSBookingGetManyRequest,
	SPSBookingGetOneRequest,
	SPSBookingUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class SPSBookingRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: SPSBookingFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const spsBookings = await this.prisma.sPSBooking.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				spsId: query.spsId,
				sellerId: query.sellerId,
			},
			...paginationOptions,
		})

		return spsBookings
	}

	async findOne(query: SPSBookingFindOneRequest) {
		const spsBooking = await this.prisma.sPSBooking.findFirst({
			where: {
				id: query.id,
			},
		})

		return spsBooking
	}

	async countFindMany(query: SPSBookingFindManyRequest) {
		const spsBookingCount = await this.prisma.sPSBooking.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				spsId: query.spsId,
				sellerId: query.sellerId,
			},
		})

		return spsBookingCount
	}

	async getMany(query: SPSBookingGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const spsBookings = await this.prisma.sPSBooking.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
			},
			...paginationOptions,
		})

		return spsBookings
	}

	async getOne(query: SPSBookingGetOneRequest) {
		const spsBooking = await this.prisma.sPSBooking.findFirst({
			where: {
				id: query.id,
				sellerId: query.sellerId,
			},
		})

		return spsBooking
	}

	async countGetMany(query: SPSBookingGetManyRequest) {
		const spsBookingCount = await this.prisma.sPSBooking.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				sellerId: query.sellerId,
			},
		})

		return spsBookingCount
	}

	async createOne(body: SPSBookingCreateOneRequest) {
		const spsBooking = await this.prisma.sPSBooking.create({
			data: {
				sellerId: body.sellerId,
				spsId: body.spsId,
				quantity: body.quantity,
			},
		})
		return spsBooking
	}

	async updateOne(query: SPSBookingGetOneRequest, body: SPSBookingUpdateOneRequest) {
		const spsBooking = await this.prisma.sPSBooking.update({
			where: { id: query.id },
			data: {
				sellerId: body.sellerId,
				spsId: body.spsId,
				quantity: body.quantity,
				deletedAt: body.deletedAt,
			},
		})

		return spsBooking
	}

	async deleteOne(query: SPSBookingDeleteOneRequest) {
		const spsBooking = await this.prisma.sPSBooking.delete({
			where: { id: query.id },
		})
		return spsBooking
	}
}
