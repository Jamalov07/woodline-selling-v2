import { BadRequestException, Injectable } from '@nestjs/common'
import { TransferRepository } from './transfer.repository'
import {
	TransferCreateOneRequest,
	TransferDeleteOneRequest,
	TransferFindManyRequest,
	TransferFindOneRequest,
	TransferGetManyRequest,
	TransferGetOneRequest,
	TransferUpdateOneRequest,
} from './interfaces'
import { createResponse, DeleteMethodEnum } from '../../common'

@Injectable()
export class TransferService {
	private readonly transferRepository: TransferRepository
	constructor(transferRepository: TransferRepository) {
		this.transferRepository = transferRepository
	}

	async findMany(query: TransferFindManyRequest) {
		const transfers = await this.transferRepository.findMany(query)
		const transfersCount = await this.transferRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: transfersCount,
					pagesCount: Math.ceil(transfersCount / query.pageSize),
					pageSize: transfers.length,
					data: transfers,
				}
			: { data: transfers }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: TransferFindOneRequest) {
		const transfer = await this.transferRepository.findOne(query)

		if (!transfer) {
			throw new BadRequestException('transfer not found')
		}
		return createResponse({ data: { ...transfer }, success: { messages: ['find one success'] } })
	}

	async getMany(query: TransferGetManyRequest) {
		const transfers = await this.transferRepository.getMany(query)
		const transfersCount = await this.transferRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(transfersCount / query.pageSize),
					pageSize: transfers.length,
					data: transfers,
				}
			: { data: transfers }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: TransferGetOneRequest) {
		const transfer = await this.transferRepository.getOne(query)

		if (!transfer) {
			throw new BadRequestException('transfer not found')
		}

		return createResponse({ data: transfer, success: { messages: ['get one success'] } })
	}

	async createOne(body: TransferCreateOneRequest) {
		await this.transferRepository.createOne({ ...body })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: TransferGetOneRequest, body: TransferUpdateOneRequest) {
		await this.getOne(query)

		await this.transferRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: TransferDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.transferRepository.deleteOne(query)
		} else {
			await this.transferRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
