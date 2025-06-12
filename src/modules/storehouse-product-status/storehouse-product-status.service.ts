import { BadRequestException, Injectable } from '@nestjs/common'
import { SPSRepository } from './storehouse-product-status.repository'
import { SPSCreateOneRequest, SPSDeleteOneRequest, SPSFindManyRequest, SPSFindOneRequest, SPSGetManyRequest, SPSGetOneRequest, SPSUpdateOneRequest } from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'

@Injectable()
export class SPSService {
	private readonly spsRepository: SPSRepository
	constructor(spsRepository: SPSRepository) {
		this.spsRepository = spsRepository
	}

	async findMany(request: CRequest, query: SPSFindManyRequest) {
		const spss = await this.spsRepository.findMany({ ...query })
		const spssCount = await this.spsRepository.countFindMany({ ...query })

		const result = query.pagination
			? {
					totalCount: spssCount,
					pagesCount: Math.ceil(spssCount / query.pageSize),
					pageSize: spss.length,
					data: spss,
				}
			: { data: spss }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: SPSFindOneRequest) {
		const staff = await this.spsRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('sps not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: SPSGetManyRequest) {
		const spss = await this.spsRepository.getMany(query)
		const spssCount = await this.spsRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(spssCount / query.pageSize),
					pageSize: spss.length,
					data: spss,
				}
			: { data: spss }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: SPSGetOneRequest) {
		const staff = await this.spsRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('sps not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: SPSCreateOneRequest) {
		await this.spsRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: SPSGetOneRequest, body: SPSUpdateOneRequest) {
		await this.getOne(query)

		await this.spsRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: SPSDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.spsRepository.deleteOne(query)
		} else {
			await this.spsRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
