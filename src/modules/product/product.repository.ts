import { Injectable } from '@nestjs/common'
import { PrismaService } from '../shared/prisma'
import {
	ProductCreateOneRequest,
	ProductDeleteOneRequest,
	ProductFindManyRequest,
	ProductFindOneRequest,
	ProductGetManyRequest,
	ProductGetOneRequest,
	ProductUpdateOneRequest,
} from './interfaces'
import { deletedAtConverter } from '../../common'

@Injectable()
export class ProductRepository {
	private readonly prisma: PrismaService
	constructor(prisma: PrismaService) {
		this.prisma = prisma
	}

	async findMany(query: ProductFindManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const products = await this.prisma.product.findMany({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				description: { contains: query.description, mode: 'insensitive' },
				tissue: { contains: query.tissue, mode: 'insensitive' },
				publicId: { contains: query.publicId, mode: 'insensitive' },
				direction: query.direction,
				modelId: query.modelId,
				OR: [
					{ publicId: { contains: query.search, mode: 'insensitive' } },
					{ model: { name: { contains: query.search, mode: 'insensitive' } } },
					{ model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } },
				],
			},
			select: {
				id: true,
				type: true,
				description: true,
				direction: true,
				publicId: true,
				quantity: true,
				tissue: true,
				createdAt: true,
				model: {
					select: {
						id: true,
						name: true,
						createdAt: true,
						provider: { select: { id: true, phone: true, fullname: true } },
						furnitureType: { select: { id: true, name: true, createdAt: true } },
					},
				},
			},
			...paginationOptions,
		})

		return products
	}

	async findOne(query: ProductFindOneRequest) {
		const product = await this.prisma.product.findFirst({
			where: {
				id: query.id,
			},
			select: {
				id: true,
				type: true,
				description: true,
				direction: true,
				publicId: true,
				quantity: true,
				tissue: true,
				createdAt: true,
				model: {
					select: {
						id: true,
						name: true,
						createdAt: true,
						provider: { select: { id: true, phone: true, fullname: true } },
						furnitureType: { select: { id: true, name: true, createdAt: true } },
					},
				},
			},
		})

		return product
	}

	async countFindMany(query: ProductFindManyRequest) {
		const productCount = await this.prisma.product.count({
			where: {
				deletedAt: deletedAtConverter(query.isDeleted),
				description: { contains: query.description, mode: 'insensitive' },
				tissue: { contains: query.tissue, mode: 'insensitive' },
				publicId: { contains: query.publicId, mode: 'insensitive' },
				direction: query.direction,
				modelId: query.modelId,
				OR: [
					{ publicId: { contains: query.search, mode: 'insensitive' } },
					{ model: { name: { contains: query.search, mode: 'insensitive' } } },
					{ model: { furnitureType: { name: { contains: query.search, mode: 'insensitive' } } } },
				],
			},
		})

		return productCount
	}

	async getMany(query: ProductGetManyRequest) {
		let paginationOptions = {}
		if (query.pagination) {
			paginationOptions = { take: query.pageSize, skip: (query.pageNumber - 1) * query.pageSize }
		}

		const products = await this.prisma.product.findMany({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				publicId: query.publicId,
			},
			...paginationOptions,
		})

		return products
	}

	async getOne(query: ProductGetOneRequest) {
		const product = await this.prisma.product.findFirst({
			where: {
				id: query.id,
				publicId: query.publicId,
			},
		})

		return product
	}

	async countGetMany(query: ProductGetManyRequest) {
		const productCount = await this.prisma.product.count({
			where: {
				id: { in: query.ids },
				deletedAt: deletedAtConverter(query.isDeleted),
				publicId: query.publicId,
			},
		})

		return productCount
	}

	async createOne(body: ProductCreateOneRequest) {
		const product = await this.prisma.product.create({
			data: {
				type: body.type,
				direction: body.direction,
				description: body.description,
				publicId: body.publicId,
				tissue: body.tissue,
				modelId: body.modelId,
				quantity: body.quantity,
			},
		})
		return product
	}

	async updateOne(query: ProductGetOneRequest, body: ProductUpdateOneRequest) {
		const product = await this.prisma.product.update({
			where: { id: query.id },
			data: {
				direction: body.direction,
				description: body.description,
				tissue: body.tissue,
				modelId: body.modelId,
				quantity: body.quantity,
				deletedAt: body.deletedAt,
			},
		})

		return product
	}

	async deleteOne(query: ProductDeleteOneRequest) {
		const product = await this.prisma.product.delete({
			where: { id: query.id },
		})
		return product
	}
}
