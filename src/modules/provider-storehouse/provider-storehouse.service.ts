import { BadRequestException, Injectable } from '@nestjs/common'
import { ProviderStorehouseRepository } from './provider-storehouse.repository'
import {
	ProviderStorehouseCreateOneRequest,
	ProviderStorehouseDeleteOneRequest,
	ProviderStorehouseFindManyRequest,
	ProviderStorehouseFindOneRequest,
	ProviderStorehouseGetManyRequest,
	ProviderStorehouseGetOneRequest,
	ProviderStorehouseUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest } from '../../common'

@Injectable()
export class ProviderStorehouseService {
	private readonly providerStorehouseRepository: ProviderStorehouseRepository
	constructor(providerStorehouseRepository: ProviderStorehouseRepository) {
		this.providerStorehouseRepository = providerStorehouseRepository
	}

	async findMany(query: ProviderStorehouseFindManyRequest) {
		const providerStorehouses = await this.providerStorehouseRepository.findMany(query)
		const providerStorehousesCount = await this.providerStorehouseRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: providerStorehousesCount,
					pagesCount: Math.ceil(providerStorehousesCount / query.pageSize),
					pageSize: providerStorehouses.length,
					data: providerStorehouses,
				}
			: { data: providerStorehouses }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ProviderStorehouseFindOneRequest) {
		const providerStorehouse = await this.providerStorehouseRepository.findOne(query)

		if (!providerStorehouse) {
			throw new BadRequestException('provider storehouse not found')
		}
		return createResponse({ data: { ...providerStorehouse }, success: { messages: ['find one success'] } })
	}

	async getMany(query: ProviderStorehouseGetManyRequest) {
		const providerStorehouses = await this.providerStorehouseRepository.getMany(query)
		const providerStorehousesCount = await this.providerStorehouseRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(providerStorehousesCount / query.pageSize),
					pageSize: providerStorehouses.length,
					data: providerStorehouses,
				}
			: { data: providerStorehouses }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ProviderStorehouseGetOneRequest) {
		const providerStorehouse = await this.providerStorehouseRepository.getOne(query)

		if (!providerStorehouse) {
			throw new BadRequestException('provider storehouse not found')
		}

		return createResponse({ data: providerStorehouse, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProviderStorehouseCreateOneRequest) {
		await this.providerStorehouseRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ProviderStorehouseGetOneRequest, body: ProviderStorehouseUpdateOneRequest) {
		await this.getOne(query)

		await this.providerStorehouseRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ProviderStorehouseDeleteOneRequest) {
		await this.getOne(query)
		await this.providerStorehouseRepository.deleteOne(query)
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
