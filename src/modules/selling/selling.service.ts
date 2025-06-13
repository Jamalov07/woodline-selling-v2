import { BadRequestException, Injectable } from '@nestjs/common'
import { SellingRepository } from './selling.repository'
import {
	SellingCreateOneRequest,
	SellingDeleteOneRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetManyRequest,
	SellingGetOneRequest,
	SellingUpdateOneRequest,
} from './interfaces'
import { createResponse, DeleteMethodEnum } from '../../common'

@Injectable()
export class SellingService {
	private readonly sellingRepository: SellingRepository
	constructor(sellingRepository: SellingRepository) {
		this.sellingRepository = sellingRepository
	}

	async findMany(query: SellingFindManyRequest) {
		const sellings = await this.sellingRepository.findMany(query)
		const sellingsCount = await this.sellingRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: sellingsCount,
					pagesCount: Math.ceil(sellingsCount / query.pageSize),
					pageSize: sellings.length,
					data: sellings,
				}
			: { data: sellings }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: SellingFindOneRequest) {
		const selling = await this.sellingRepository.findOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}
		return createResponse({ data: { ...selling }, success: { messages: ['find one success'] } })
	}

	async getMany(query: SellingGetManyRequest) {
		const sellings = await this.sellingRepository.getMany(query)
		const sellingsCount = await this.sellingRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(sellingsCount / query.pageSize),
					pageSize: sellings.length,
					data: sellings,
				}
			: { data: sellings }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: SellingGetOneRequest) {
		const selling = await this.sellingRepository.getOne(query)

		if (!selling) {
			throw new BadRequestException('selling not found')
		}

		return createResponse({ data: selling, success: { messages: ['get one success'] } })
	}

	async createOne(body: SellingCreateOneRequest) {
		await this.sellingRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		const selling = await this.getOne(query)

		if (selling.data.isAccepted) {
			throw new BadRequestException("selling is accepted, you can't edit this selling")
		}

		await this.sellingRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: SellingDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.sellingRepository.deleteOne(query)
		} else {
			await this.sellingRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
