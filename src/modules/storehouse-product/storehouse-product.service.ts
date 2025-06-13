import { BadRequestException, Injectable } from '@nestjs/common'
import { StorehouseProductRepository } from './storehouse-product.repository'
import {
	StorehouseProductCreateOneRequest,
	StorehouseProductDeleteOneRequest,
	StorehouseProductFindManyRequest,
	StorehouseProductFindOneRequest,
	StorehouseProductGetManyRequest,
	StorehouseProductGetOneRequest,
	StorehouseProductUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'

@Injectable()
export class StorehouseProductService {
	private readonly storehouseProductRepository: StorehouseProductRepository
	constructor(storehouseProductRepository: StorehouseProductRepository) {
		this.storehouseProductRepository = storehouseProductRepository
	}

	async findMany(request: CRequest, query: StorehouseProductFindManyRequest) {
		const storehouseProducts = await this.storehouseProductRepository.findMany({
			...query,
			bookedStorekeeperId: query.bookedByMe ? request.user.id : undefined,
		})
		const storehouseProductsCount = await this.storehouseProductRepository.countFindMany({
			...query,
			bookedStorekeeperId: query.bookedByMe ? request.user.id : undefined,
		})

		const result = query.pagination
			? {
					totalCount: storehouseProductsCount,
					pagesCount: Math.ceil(storehouseProductsCount / query.pageSize),
					pageSize: storehouseProducts.length,
					data: storehouseProducts,
				}
			: { data: storehouseProducts }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: StorehouseProductFindOneRequest) {
		const sp = await this.storehouseProductRepository.findOne(query)

		if (!sp) {
			throw new BadRequestException('sp not found')
		}
		return createResponse({ data: { ...sp }, success: { messages: ['find one success'] } })
	}

	async getMany(query: StorehouseProductGetManyRequest) {
		const storehouseProducts = await this.storehouseProductRepository.getMany(query)
		const storehouseProductsCount = await this.storehouseProductRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(storehouseProductsCount / query.pageSize),
					pageSize: storehouseProducts.length,
					data: storehouseProducts,
				}
			: { data: storehouseProducts }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: StorehouseProductGetOneRequest) {
		const sp = await this.storehouseProductRepository.getOne(query)

		if (!sp) {
			throw new BadRequestException('sp not found')
		}

		return createResponse({ data: sp, success: { messages: ['get one success'] } })
	}

	async createOne(body: StorehouseProductCreateOneRequest) {
		await this.storehouseProductRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: StorehouseProductGetOneRequest, body: StorehouseProductUpdateOneRequest) {
		await this.getOne(query)

		await this.storehouseProductRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: StorehouseProductDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.storehouseProductRepository.deleteOne(query)
		} else {
			await this.storehouseProductRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
