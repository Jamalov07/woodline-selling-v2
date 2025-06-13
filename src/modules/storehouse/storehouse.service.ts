import { BadRequestException, Injectable } from '@nestjs/common'
import { StorehouseRepository } from './storehouse.repository'
import {
	StorehouseCreateOneRequest,
	StorehouseDeleteOneRequest,
	StorehouseFindManyRequest,
	StorehouseFindOneRequest,
	StorehouseGetManyRequest,
	StorehouseGetOneRequest,
	StorehouseUpdateOneRequest,
} from './interfaces'
import { createResponse, DeleteMethodEnum } from '../../common'

@Injectable()
export class StorehouseService {
	private readonly storehouseRepository: StorehouseRepository
	constructor(storehouseRepository: StorehouseRepository) {
		this.storehouseRepository = storehouseRepository
	}

	async findMany(query: StorehouseFindManyRequest) {
		const storehouses = await this.storehouseRepository.findMany(query)
		const storehousesCount = await this.storehouseRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: storehousesCount,
					pagesCount: Math.ceil(storehousesCount / query.pageSize),
					pageSize: storehouses.length,
					data: storehouses,
				}
			: { data: storehouses }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: StorehouseFindOneRequest) {
		const storehouse = await this.storehouseRepository.findOne(query)

		if (!storehouse) {
			throw new BadRequestException('storehouse not found')
		}
		return createResponse({ data: { ...storehouse }, success: { messages: ['find one success'] } })
	}

	async getMany(query: StorehouseGetManyRequest) {
		const storehouses = await this.storehouseRepository.getMany(query)
		const storehousesCount = await this.storehouseRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(storehousesCount / query.pageSize),
					pageSize: storehouses.length,
					data: storehouses,
				}
			: { data: storehouses }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: StorehouseGetOneRequest) {
		const storehouse = await this.storehouseRepository.getOne(query)

		if (!storehouse) {
			throw new BadRequestException('storehouse not found')
		}

		return createResponse({ data: storehouse, success: { messages: ['get one success'] } })
	}

	async createOne(body: StorehouseCreateOneRequest) {
		const candidate = await this.storehouseRepository.getOne({ name: body.name })
		if (candidate) {
			throw new BadRequestException('name already exists')
		}

		await this.storehouseRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: StorehouseGetOneRequest, body: StorehouseUpdateOneRequest) {
		await this.getOne(query)

		if (body.name) {
			const candidate = await this.storehouseRepository.getOne({ name: body.name })
			if (candidate && candidate.id !== query.id) {
				throw new BadRequestException('name already exists')
			}
		}

		await this.storehouseRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: StorehouseDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.storehouseRepository.deleteOne(query)
		} else {
			await this.storehouseRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
