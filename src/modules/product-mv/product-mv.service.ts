import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductMVRepository } from './product-mv.repository'
import {
	ProductMVCreateOneRequest,
	ProductMVDeleteOneRequest,
	ProductMVFindManyRequest,
	ProductMVFindOneRequest,
	ProductMVGetManyRequest,
	ProductMVGetOneRequest,
	ProductMVUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'

@Injectable()
export class ProductMVService {
	private readonly productMVRepository: ProductMVRepository
	constructor(productMVRepository: ProductMVRepository) {
		this.productMVRepository = productMVRepository
	}

	async findMany(request: CRequest, query: ProductMVFindManyRequest) {
		const productMVs = await this.productMVRepository.findMany(query)
		const productMVsCount = await this.productMVRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: productMVsCount,
					pagesCount: Math.ceil(productMVsCount / query.pageSize),
					pageSize: productMVs.length,
					data: productMVs,
				}
			: { data: productMVs }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ProductMVFindOneRequest) {
		const productMV = await this.productMVRepository.findOne(query)

		if (!productMV) {
			throw new BadRequestException('productMV not found')
		}
		return createResponse({ data: { ...productMV }, success: { messages: ['find one success'] } })
	}

	async getMany(query: ProductMVGetManyRequest) {
		const productMVs = await this.productMVRepository.getMany(query)
		const productMVsCount = await this.productMVRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(productMVsCount / query.pageSize),
					pageSize: productMVs.length,
					data: productMVs,
				}
			: { data: productMVs }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ProductMVGetOneRequest) {
		const productMV = await this.productMVRepository.getOne(query)

		if (!productMV) {
			throw new BadRequestException('productMV not found')
		}

		return createResponse({ data: productMV, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProductMVCreateOneRequest) {
		await this.productMVRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ProductMVGetOneRequest, body: ProductMVUpdateOneRequest) {
		await this.getOne(query)

		await this.productMVRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ProductMVDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.productMVRepository.deleteOne(query)
		} else {
			await this.productMVRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
