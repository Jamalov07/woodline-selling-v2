import { Injectable, OnApplicationBootstrap, Type } from '@nestjs/common'
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core'
import { RequestMethod } from '@nestjs/common'
import { ActionMethod } from '@prisma/client'
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants'
import { PrismaService } from '../shared/prisma'
import { actionDescriptionConverter } from '../../common'

@Injectable()
export class ActionSyncService implements OnApplicationBootstrap {
	constructor(
		private readonly discoveryService: DiscoveryService,
		private readonly metadataScanner: MetadataScanner,
		private readonly reflector: Reflector,
		private readonly prisma: PrismaService,
	) {}

	async onApplicationBootstrap() {
		const controllers = this.discoveryService.getControllers().filter((wrapper) => wrapper.metatype) as { metatype: Type<any> }[]

		const actions: {
			url: string
			method: ActionMethod
			name: string
			description: string
		}[] = []

		for (const wrapper of controllers) {
			const controller = wrapper.metatype
			const controllerPrototype = controller.prototype

			const baseRoute = this.reflector.get<string>(PATH_METADATA, controller) || ''

			this.metadataScanner.scanFromPrototype(controllerPrototype, controllerPrototype, (methodName: string) => {
				const handler = controllerPrototype[methodName]

				const routePath = Reflect.getMetadata(PATH_METADATA, handler)
				const method: RequestMethod = Reflect.getMetadata(METHOD_METADATA, handler)

				if (routePath && method !== undefined) {
					const fullRoute = `/${baseRoute}/${routePath}`.replace(/\/+/g, '/')

					actions.push({
						method: RequestMethod[method].toLocaleLowerCase() as keyof typeof ActionMethod,
						url: fullRoute,
						name: methodName,
						description: actionDescriptionConverter(`${fullRoute}-${methodName}-${RequestMethod[method].toLowerCase()}`),
					})
				}
			})
		}

		if (actions.length > 0) {
			await this.prisma.action.createMany({
				data: actions,
				skipDuplicates: true,
			})
			console.log(`[ActionSync] ${actions.length} ta action sinxron qilindi`)
		}
	}
}
