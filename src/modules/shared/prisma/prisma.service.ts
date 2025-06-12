import type { OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Global, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'

@Global()
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly config: ConfigService
	constructor(config: ConfigService) {
		super({ datasources: { db: { url: config.getOrThrow<string>('database.url') } } })
		this.config = config

		this.$use(async (params, next) => {
			if (['findMany', 'findFirst'].includes(params.action) && !['PublicId', 'Role'].includes(params.model)) {
				if (!params.args) params.args = {}
				if (!params?.args?.orderBy) {
					params.args.orderBy = [{ createdAt: 'desc' }]
				} else {
					if (!['PublicId', 'Role'].includes(params.model)) {
						if (Array.isArray(params.args.orderBy)) {
							params.args.orderBy.push({ createdAt: 'desc' })
						} else {
							params.args.orderBy = { createdAt: 'desc' }
						}
					}
				}
				// if (!params.args.where.deletedAt) {
				// 	params.args.where.deletedAt = null
				// }
			}

			return next(params)
		})
	}

	async onModuleInit() {
		await this.$connect()
	}

	async onModuleDestroy() {
		await this.$disconnect()
	}
}
