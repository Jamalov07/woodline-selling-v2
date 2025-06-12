import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductStatusMVRepository } from './product-status-mv.repository'
import {
	ProductStatusMVCreateOneRequest,
	ProductStatusMVDeleteOneRequest,
	ProductStatusMVFindManyRequest,
	ProductStatusMVFindOneRequest,
	ProductStatusMVGetManyRequest,
	ProductStatusMVGetOneRequest,
	ProductStatusMVUpdateOneRequest,
} from './interfaces'
import { createResponse, CRequest, DeleteMethodEnum } from '../../common'

@Injectable()
export class ProductStatusMVService {
	private readonly productStatusMVRepository: ProductStatusMVRepository
	constructor(productStatusMVRepository: ProductStatusMVRepository) {
		this.productStatusMVRepository = productStatusMVRepository
	}

	async findMany(request: CRequest, query: ProductStatusMVFindManyRequest) {
		const productStatusMVs = await this.productStatusMVRepository.findMany({ ...query })
		const productStatusMVsCount = await this.productStatusMVRepository.countFindMany({ ...query })

		const result = query.pagination
			? {
					totalCount: productStatusMVsCount,
					pagesCount: Math.ceil(productStatusMVsCount / query.pageSize),
					pageSize: productStatusMVs.length,
					data: productStatusMVs,
				}
			: { data: productStatusMVs }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ProductStatusMVFindOneRequest) {
		const staff = await this.productStatusMVRepository.findOne(query)

		if (!staff) {
			throw new BadRequestException('productStatusMV not found')
		}
		return createResponse({ data: { ...staff }, success: { messages: ['find one success'] } })
	}

	async getMany(query: ProductStatusMVGetManyRequest) {
		const productStatusMVs = await this.productStatusMVRepository.getMany(query)
		const productStatusMVsCount = await this.productStatusMVRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(productStatusMVsCount / query.pageSize),
					pageSize: productStatusMVs.length,
					data: productStatusMVs,
				}
			: { data: productStatusMVs }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ProductStatusMVGetOneRequest) {
		const staff = await this.productStatusMVRepository.getOne(query)

		if (!staff) {
			throw new BadRequestException('productStatusMV not found')
		}

		return createResponse({ data: staff, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProductStatusMVCreateOneRequest) {
		await this.productStatusMVRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ProductStatusMVGetOneRequest, body: ProductStatusMVUpdateOneRequest) {
		await this.getOne(query)

		await this.productStatusMVRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ProductStatusMVDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.productStatusMVRepository.deleteOne(query)
		} else {
			await this.productStatusMVRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
