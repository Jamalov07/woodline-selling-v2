import { BadRequestException, Injectable } from '@nestjs/common'
import { SPSBookingRepository } from './storehouse-product-status-booking.repository'
import {
	SPSBookingCreateOneRequest,
	SPSBookingDeleteOneRequest,
	SPSBookingFindManyRequest,
	SPSBookingFindOneRequest,
	SPSBookingGetManyRequest,
	SPSBookingGetOneRequest,
	SPSBookingUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'

@Injectable()
export class SPSBookingService {
	private readonly spsBookingRepository: SPSBookingRepository
	constructor(spsBookingRepository: SPSBookingRepository) {
		this.spsBookingRepository = spsBookingRepository
	}

	async findMany(query: SPSBookingFindManyRequest) {
		const spsBookings = await this.spsBookingRepository.findMany({ ...query })
		const spsBookingsCount = await this.spsBookingRepository.countFindMany({ ...query })

		const result = query.pagination
			? {
					totalCount: spsBookingsCount,
					pagesCount: Math.ceil(spsBookingsCount / query.pageSize),
					pageSize: spsBookings.length,
					data: spsBookings,
				}
			: { data: spsBookings }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: SPSBookingFindOneRequest) {
		const spsBooking = await this.spsBookingRepository.findOne(query)

		if (!spsBooking) {
			throw new BadRequestException('spsBooking not found')
		}
		return createResponse({ data: { ...spsBooking }, success: { messages: ['find one success'] } })
	}

	async getMany(query: SPSBookingGetManyRequest) {
		const spsBookings = await this.spsBookingRepository.getMany(query)
		const spsBookingsCount = await this.spsBookingRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(spsBookingsCount / query.pageSize),
					pageSize: spsBookings.length,
					data: spsBookings,
				}
			: { data: spsBookings }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: SPSBookingGetOneRequest) {
		const spsBooking = await this.spsBookingRepository.getOne(query)

		if (!spsBooking) {
			throw new BadRequestException('spsBooking not found')
		}

		return createResponse({ data: spsBooking, success: { messages: ['get one success'] } })
	}

	async createOne(request: CRequest, body: SPSBookingCreateOneRequest) {
		await this.spsBookingRepository.createOne({ ...body, sellerId: request.user.id })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: SPSBookingGetOneRequest, body: SPSBookingUpdateOneRequest) {
		await this.getOne(query)

		await this.spsBookingRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: SPSBookingDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.spsBookingRepository.deleteOne(query)
		} else {
			await this.spsBookingRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
