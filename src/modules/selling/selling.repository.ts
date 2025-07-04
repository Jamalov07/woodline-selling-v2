import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	SellingCreateOneRequest,
	SellingDeleteOneRequest,
	SellingFindManyRequest,
	SellingFindOneRequest,
	SellingGetManyRequest,
	SellingGetOneRequest,
	SellingUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class SellingRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: SellingFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.selling.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				isAccepted: query.isAccepted,
			},
			select: {
				id: true,
				isAccepted: true,
				createdAt: true,
				storehouse: { select: { id: true, createdAt: true, name: true, type: true } },
				storekeeper: { select: { id: true, fullname: true, phone: true, createdAt: true } },
				orderProduct: {
					select: {
						id: true,
						type: true,
						createdAt: true,
						quantity: true,
						sps: {
							select: {
								status: true,
								sp: {
									select: {
										product: {
											select: {
												id: true,
												direction: true,
												tissue: true,
												description: true,
												publicId: true,
												quantity: true,
												model: { select: { id: true, name: true, createdAt: true, furnitureType: { select: { id: true, createdAt: true, name: true } } } },
											},
										},
									},
								},
							},
						},
					},
				},
			},
			...paginationOptions,
		})

		return sellings
	}

	async findOne(query: SellingFindOneRequest) {
		const selling = await this.prisma.selling.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				isAccepted: true,
				createdAt: true,
				storehouse: { select: { id: true, createdAt: true, name: true, type: true } },
				storekeeper: { select: { id: true, fullname: true, phone: true, createdAt: true } },
				orderProduct: {
					select: {
						id: true,
						type: true,
						createdAt: true,
						quantity: true,
						sps: {
							select: {
								status: true,
								sp: {
									select: {
										product: {
											select: {
												id: true,
												direction: true,
												tissue: true,
												description: true,
												publicId: true,
												quantity: true,
												model: { select: { id: true, name: true, createdAt: true, furnitureType: { select: { id: true, createdAt: true, name: true } } } },
											},
										},
									},
								},
							},
						},
					},
				},
			},
		})

		return selling
	}

	async countFindMany(query: SellingFindManyRequest) {
		const sellingCount = await this.prisma.selling.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				isAccepted: query.isAccepted,
			},
		})

		return sellingCount
	}

	async getMany(query: SellingGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const sellings = await this.prisma.selling.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				isAccepted: query.isAccepted,
			},
			...paginationOptions,
		})

		return sellings
	}

	async getOne(query: SellingGetOneRequest) {
		const selling = await this.prisma.selling.findFirst({
			where: {
				id: query.id,
				isAccepted: query.isAccepted,
			},
			select: {
				id: true,
				isAccepted: true,
				createdAt: true,
				storehouse: true,
				orderProduct: true,
			},
		})

		return selling
	}

	async countGetMany(query: SellingGetManyRequest) {
		const sellingCount = await this.prisma.selling.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				isAccepted: query.isAccepted,
			},
		})

		return sellingCount
	}

	async createOne(body: SellingCreateOneRequest) {
		const selling = await this.prisma.selling.create({
			data: {
				orderProductId: body.orderProductId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
			},
		})
		return selling
	}

	async updateOne(query: SellingGetOneRequest, body: SellingUpdateOneRequest) {
		const sell = await this.getOne({ id: query.id })

		if (body.isAccepted) {
			const sps = await this.prisma.sPS.findFirst({
				where: { id: sell.orderProduct.spsId },
			})

			console.log(sps.quantity, sell.orderProduct.quantity)
			if (sps.quantity < sell.orderProduct.quantity) {
				throw new BadRequestException('product not enough to out')
			} else {
				await this.prisma.sPS.update({
					where: { id: sps.id },
					data: { quantity: { decrement: sell.orderProduct.quantity } },
				})
			}
		}

		const selling = await this.prisma.selling.update({
			where: { id: query.id },
			data: {
				orderProductId: body.orderProductId,
				storehouseId: body.storehouseId,
				storekeeperId: body.storekeeperId,
				isAccepted: body.isAccepted,
				deletedAt: body.deletedAt,
			},
		})

		return selling
	}

	async deleteOne(query: SellingDeleteOneRequest) {
		const selling = await this.prisma.selling.delete({
			where: { id: query.id },
		})
		return selling
	}
}
