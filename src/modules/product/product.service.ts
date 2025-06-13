import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductRepository } from './product.repository'
import {
	ProductCreateOneRequest,
	ProductDeleteOneRequest,
	ProductFindManyRequest,
	ProductFindOneRequest,
	ProductGetManyRequest,
	ProductGetOneRequest,
	ProductUpdateOneRequest,
} from './interfaces'
import { createResponse, DeleteMethodEnum } from '../../common'

@Injectable()
export class ProductService {
	private readonly productRepository: ProductRepository
	constructor(productRepository: ProductRepository) {
		this.productRepository = productRepository
	}

	async findMany(query: ProductFindManyRequest) {
		const products = await this.productRepository.findMany(query)
		const productsCount = await this.productRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: productsCount,
					pagesCount: Math.ceil(productsCount / query.pageSize),
					pageSize: products.length,
					data: products,
				}
			: { data: products }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: ProductFindOneRequest) {
		const product = await this.productRepository.findOne(query)

		if (!product) {
			throw new BadRequestException('product not found')
		}
		return createResponse({ data: { ...product }, success: { messages: ['find one success'] } })
	}

	async getMany(query: ProductGetManyRequest) {
		const products = await this.productRepository.getMany(query)
		const productsCount = await this.productRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(productsCount / query.pageSize),
					pageSize: products.length,
					data: products,
				}
			: { data: products }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: ProductGetOneRequest) {
		const product = await this.productRepository.getOne(query)

		if (!product) {
			throw new BadRequestException('product not found')
		}

		return createResponse({ data: product, success: { messages: ['get one success'] } })
	}

	async createOne(body: ProductCreateOneRequest) {
		await this.productRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: ProductGetOneRequest, body: ProductUpdateOneRequest) {
		await this.getOne(query)

		await this.productRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: ProductDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.productRepository.deleteOne(query)
		} else {
			await this.productRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
