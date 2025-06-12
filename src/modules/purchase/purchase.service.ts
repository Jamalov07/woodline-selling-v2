import { CRequest } from '@common'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PurchaseRepository } from './purchase.repository'
import {
	PurchaseCreateOneRequest,
	PurchaseDeleteOneRequest,
	PurchaseFindManyRequest,
	PurchaseFindOneRequest,
	PurchaseGetManyRequest,
	PurchaseGetOneRequest,
	PurchaseUpdateOneRequest,
} from './interfaces'
import { createResponse, DeleteMethodEnum } from '../../common'
import { UserService } from '../user'
import { RoleName } from '@prisma/client'

@Injectable()
export class PurchaseService {
	private readonly purchaseRepository: PurchaseRepository
	private readonly userService: UserService
	constructor(purchaseRepository: PurchaseRepository, userService: UserService) {
		this.purchaseRepository = purchaseRepository
		this.userService = userService
	}

	async findMany(query: PurchaseFindManyRequest) {
		const purchases = await this.purchaseRepository.findMany(query)
		const purchasesCount = await this.purchaseRepository.countFindMany(query)

		const result = query.pagination
			? {
					totalCount: purchasesCount,
					pagesCount: Math.ceil(purchasesCount / query.pageSize),
					pageSize: purchases.length,
					data: purchases,
				}
			: { data: purchases }

		return createResponse({ data: result, success: { messages: ['find many success'] } })
	}

	async findOne(query: PurchaseFindOneRequest) {
		const purchase = await this.purchaseRepository.findOne(query)

		if (!purchase) {
			throw new BadRequestException('purchase not found')
		}
		return createResponse({ data: { ...purchase }, success: { messages: ['find one success'] } })
	}

	async getMany(query: PurchaseGetManyRequest) {
		const purchases = await this.purchaseRepository.getMany(query)
		const purchasesCount = await this.purchaseRepository.countGetMany(query)

		const result = query.pagination
			? {
					pagesCount: Math.ceil(purchasesCount / query.pageSize),
					pageSize: purchases.length,
					data: purchases,
				}
			: { data: purchases }

		return createResponse({ data: result, success: { messages: ['get many success'] } })
	}

	async getOne(query: PurchaseGetOneRequest) {
		const purchase = await this.purchaseRepository.getOne(query)

		if (!purchase) {
			throw new BadRequestException('purchase not found')
		}

		return createResponse({ data: purchase, success: { messages: ['get one success'] } })
	}

	async createOne(request: CRequest, body: PurchaseCreateOneRequest) {
		const storekeeper = await this.userService.findOne({ id: request.user.id })

		const storekeeperRole = storekeeper.data.roles.find((r) => r.name === RoleName.storekeeper)
		if (!storekeeperRole) {
			throw new BadRequestException('storekeeper not found')
		}
		await this.purchaseRepository.createOne({ ...body, storekeeperId: request.user.id })

		return createResponse({ data: null, success: { messages: ['create one success'] } })
	}

	async updateOne(query: PurchaseGetOneRequest, body: PurchaseUpdateOneRequest) {
		await this.getOne(query)

		await this.purchaseRepository.updateOne(query, { ...body })

		return createResponse({ data: null, success: { messages: ['update one success'] } })
	}

	async deleteOne(query: PurchaseDeleteOneRequest) {
		await this.getOne(query)
		if (query.method === DeleteMethodEnum.hard) {
			await this.purchaseRepository.deleteOne(query)
		} else {
			await this.purchaseRepository.updateOne(query, { deletedAt: new Date() })
		}
		return createResponse({ data: null, success: { messages: ['delete one success'] } })
	}
}
